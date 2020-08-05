import React,  { useContext } from 'react'
import classnames from 'classnames'

import { MenuItemProps } from './types'
import { MenuContext } from './menu'

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    children,
    index,
    disabled
  } = props
  const MenuContextValue = useContext(MenuContext)
  const { currentIndex, onSelect } = MenuContextValue
  const isActive: boolean = currentIndex === index
  const classes = classnames('menu-item',{
    'active': isActive,
    'disabled': disabled
  })
  const handleSelect = () => {
    if(onSelect && !isActive && !disabled && typeof index === 'string') {
      onSelect(index)
    }
  }
  return (
    <li 
      className={classes}
      onClick={handleSelect}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem