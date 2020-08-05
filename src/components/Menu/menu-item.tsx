import React, { useContext } from 'react'
import classnames from 'classnames'

import { MenuContext } from './menu'

export interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: string;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, children, index, disabled } = props
  const menuContextValue = useContext(MenuContext)
  const isActive: boolean = index === menuContextValue.index
  const classes = classnames('menu-item', className, {
    "disabled": disabled,
    "active": isActive
  })
  const handleSelected = () => {
    if(menuContextValue.onSelect && !disabled && !isActive && typeof index === 'string') {
      menuContextValue.onSelect(index)
    }
  }
  return (
    <li 
      className={classes}
      style={style}
      onClick={handleSelected}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem