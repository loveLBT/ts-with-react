type Size = 'lg' | 'sm'

export interface BaseInputProps {
  className?: string;
  size?: Size;
  disabled?: boolean;
  placeholder?: string;
  icon?: string;
  addonBefore?: string;
  addonAfter?: string;
}