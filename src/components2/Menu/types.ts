import React from 'react'

type Mode = 'horizontal' | 'vertical'
type SelectCallback = (index: string) => void

export interface MenuProps {
  className?: string;
  defaultIndex?: string;
  onSelect?: SelectCallback;
  mode?: Mode;
}
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
}

export interface MenuContextProps {
  currentIndex?: string;
  onSelect?: SelectCallback;
  mode?: Mode;
}

export interface SubMenuProps {
  title: string | React.ReactNode;
  index?: string;
}