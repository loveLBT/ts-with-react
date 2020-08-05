import React, { useContext, useState } from 'react'
import classnames from 'classnames'

import { SubMenuProps, MenuItemProps } from './types'
import { MenuContext } from './menu'

const SubMenu:React.FC<SubMenuProps> = (props) => {
  const {
    children,
    title,
    index
  } = props
  const MenuContextValue = useContext(MenuContext)
  const [ opened, setOpened ] = useState(false)
  const { currentIndex, mode } = MenuContextValue
  const classes = classnames('menu-item', 'submenu-item', {
    'active': currentIndex?.slice(0, 1) === index,
    'opened': opened,
    'vertical': mode === 'vertical'
  })
  const submenuClasses = classnames('submenu', {
    'menu-opened': opened
  })
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setOpened(toggle)
    }, 300)
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpened(!opened)
  }
  const hoverEvent = mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}
  const clickEvent = mode === 'vertical' ? {
    onClick: (e: React.MouseEvent) => handleClick(e)
  } : {}
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem') {
        return React.cloneElement(
          childElement,
          {index: `${index}-${i}`}
        )
      }else {
        console.error('SubMenu的子节点必须是MenuItem组件')
      }
    })
  }
  return (
    <li className={classes} {...hoverEvent}>
      <div className='submenu-title' {...clickEvent}>
        {title}
      </div>
      <ul className={submenuClasses}>
        {renderChildren()}
      </ul>
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu