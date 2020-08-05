import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import Transition from '../Transition/transition'

import { MenuContext } from './menu'
import Icon from '../Icon/icon'

interface SubMenuProps {
  className?: string;
  title: string;
  index?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { className, title, index, children } = props
  const menuContextValue = useContext(MenuContext)
  const { mode, defaultOpenSubMenus } = menuContextValue
  const isOpen = (defaultOpenSubMenus && index && mode === 'vertical') ? defaultOpenSubMenus.includes(index) : false
  const [opened, setOpened] = useState(isOpen)
  const classes = classnames('menu-item', 'submenu-item', className, {
    "active": menuContextValue.index.slice(0, 1) === index,
    "vertical": mode === 'vertical',
    "opened": opened
  })
  const submenuClasses = classnames('submenu', {
    "menu-opened": opened
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpened(!opened)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpened(toggle)
    }, 300)
  }
  const hoverEvents = mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}
  const clickEvents = mode === 'vertical'? {
    onClick: (e: React.MouseEvent) => handleClick(e)
  } : {}
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<SubMenuProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {index: `${index}-${i}`})
      }else {
        console.error('SubMenu组件的子节点必须是MenuItem组件')
        return
      }
    })
  }
  return (
    <li className={classes} {...hoverEvents}>
      <div 
        className='submenu-title' 
        {...clickEvents}
      >
        {title}
        <Icon className="arrow-icon" icon="angle-down" />
      </div>
      <Transition 
        in={opened}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={submenuClasses}>
          {renderChildren()}
        </ul>
      </Transition>
      
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu