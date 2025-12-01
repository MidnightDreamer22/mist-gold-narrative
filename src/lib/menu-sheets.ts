import { MENU_SOURCES, MenuSourceConfig } from '@/config/menuConfig';

export interface CocktailItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

// Keep API credentials close to fetch logic
const SPREADSHEET_ID = '1R7sEBpCqVkWeZnxWXfG0S7CwCDVRMBI40F1N5pig4hQ';
const SHEETS_API_KEY = import.meta.env.VITE_SHEETS_API_KEY || 'AIzaSyDBYUuK8aEDri_w8KYvEnWmWpm2geGHHMA';

// Cache for resolved sheet names (gid -> sheetName)
let sheetNameCache: Map<number, string> | null = null;

// Fetch spreadsheet metadata to resolve GIDs to sheet names
async function fetchSpreadsheetMetadata(): Promise<Map<number, string>> {
  if (sheetNameCache) return sheetNameCache;
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties&key=${SHEETS_API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch spreadsheet metadata');
  }
  
  const data = await response.json();
  const cache = new Map<number, string>();
  
  for (const sheet of data.sheets || []) {
    const { sheetId, title } = sheet.properties;
    cache.set(sheetId, title);
  }
  
  sheetNameCache = cache;
  return cache;
}

// Resolve sheet name from config (uses gid if sheetName not provided)
async function resolveSheetName(config: MenuSourceConfig): Promise<string> {
  if (config.sheetName) {
    return config.sheetName;
  }
  
  if (config.gid === null) {
    throw new Error(`No sheetName or gid for menu: ${config.id}`);
  }
  
  const cache = await fetchSpreadsheetMetadata();
  const name = cache.get(config.gid);
  
  if (!name) {
    throw new Error(`Could not resolve sheet name for gid: ${config.gid}`);
  }
  
  return name;
}

// Fetch menu items with robust availability filter
export async function fetchMenuItems(sheetName: string, idPrefix: string): Promise<CocktailItem[]> {
  const range = encodeURIComponent(`${sheetName}!A:G`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu data for ${sheetName}`);
  }
  
  const data = await response.json();
  const rows = data.values || [];
  
  if (rows.length === 0) return [];
  
  // Skip header, filter by availability (column C), map to items
  return rows
    .slice(1)
    .filter((row: any[]) => {
      const raw = row[2]; // Column C (availability)
      if (raw === true) return true;
      
      const availability = String(raw ?? '').trim().toUpperCase();
      return availability === 'TRUE' || availability === '1';
    })
    .map((row: any[], index: number) => ({
      id: `${idPrefix}-${index}`,
      name: row[0]?.trim() || '',
      description: row[6]?.trim() || '', // Column G
      price: row[5]?.trim() || '',        // Column F
    }))
    .filter((item) => item.name.length > 0);
}

// High-level fetch for a menu source (resolves sheet name automatically)
export async function fetchMenuBySource(config: MenuSourceConfig): Promise<CocktailItem[]> {
  const sheetName = await resolveSheetName(config);
  return fetchMenuItems(sheetName, config.id);
}

// Convenience functions
export async function fetchSimonaGathersMenu(): Promise<CocktailItem[]> {
  return fetchMenuItems('Simonagathers', 'simona-gathers');
}
