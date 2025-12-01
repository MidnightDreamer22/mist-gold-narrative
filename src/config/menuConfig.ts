export type MenuId = 'simona-gathers' | 'menu-left' | 'menu-middle' | 'menu-right';

export interface MenuSourceConfig {
  id: MenuId;
  label: string;
  gid: number | null; // null for Simonagathers (we know the name)
  sheetName: string | null; // null means resolve from gid
  description: string;
}

export const MENU_SOURCES: MenuSourceConfig[] = [
  {
    id: 'simona-gathers',
    label: 'Simona gathers',
    gid: null,
    sheetName: 'Simonagathers',
    description: 'Our signature collection',
  },
  {
    id: 'menu-left',
    label: 'Classics',
    gid: 268558607,
    sheetName: null, // Will be resolved at runtime
    description: 'Timeless cocktails crafted with precision',
  },
  {
    id: 'menu-middle',
    label: 'Signatures',
    gid: 1034683916,
    sheetName: null,
    description: 'House specialties and innovations',
  },
  {
    id: 'menu-right',
    label: 'Seasonal',
    gid: 313952319,
    sheetName: null,
    description: 'Limited editions and rotating favorites',
  },
];

export function getMenuSourceById(id: MenuId): MenuSourceConfig | undefined {
  return MENU_SOURCES.find(source => source.id === id);
}
