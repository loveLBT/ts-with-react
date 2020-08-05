type Mode = 'line' | 'card'

export type SelectCallback = (index: number) => void

export interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  mode?: Mode;
  defaultIndex?: number;
  onSelect?: SelectCallback;
}

export interface TabItemProps {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  index?: number;
  disabled?: boolean;
}

export interface TabsContextValueProps {
  currentIndex?: number;
  onSelect?: SelectCallback;
}

export type TabItems = React.FunctionComponentElement<TabItemProps>[]
export type TabContainer = string | React.ReactNode