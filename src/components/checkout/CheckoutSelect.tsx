import { forwardRef } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CheckoutSelectProps {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const CheckoutSelect = forwardRef<HTMLButtonElement, CheckoutSelectProps>(
  ({ label, error, required, placeholder, options, value, onValueChange }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger ref={ref} className={error ? 'border-destructive' : ''}>
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

CheckoutSelect.displayName = 'CheckoutSelect';
