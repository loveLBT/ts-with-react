import React, { useState } from 'react'
import classnames from 'classnames'

import { MenuProps, MenuItemProps, MenuContextProps } from './types'

export const MenuContext = React.createContext<MenuContextProps>({})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    children,
    defaultIndex,
    onSelect,
    mode
  } = props
  const [ currentIndex, setCurrentIndex ] = useState(defaultIndex)
  const handleSelect = (index: string) => {
    setCurrentIndex(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const MenuContextValue: MenuContextProps = {
    currentIndex,
    onSelect: handleSelect,
    mode
  }
  const classes = classnames('menu', className, {
    [`menu-${mode}`]: mode
  })
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(
          childElement,
          {index: index.toString()}
        )
      }else {
        console.error('Menu组件的子节点必须是MenuItem组件或SubMenu组件')
        return
      }
    })
  }
  return (
    <ul 
      className={classes}
    >
      <MenuContext.Provider value={MenuContextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export default Menu