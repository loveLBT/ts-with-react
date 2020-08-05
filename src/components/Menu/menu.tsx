import React, { useState } from 'react'
import classnames from 'classnames'

import { MenuItemProps } from './menu-item'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void
type OpenSubMneus = string[]

export interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mode?: MenuMode;
  defaultIndex?: string;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: OpenSubMneus
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: OpenSubMneus
}

export const MenuContext = React.createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const { className, style, children, mode, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const handleSelected = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const menuContextValue: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleSelected,
    mode,
    defaultOpenSubMenus
  }
  const classes = classnames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      // type 下可以拿到MenuItem组件下的静态属性与方法
      const { displayName } = childElement.type
      const { children, ...childProps } = childElement.props
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(
          childElement,
          {index: index.toString(), ...childProps},
          children
        )
      }else {
        console.error('Menu组件的子节点必须是MenuItem组件')
        return
      }
    })
  }

  return (
    <ul 
      className={classes}
      style={style}
    >
      <MenuContext.Provider value={menuContextValue}>
        {renderChildren()}
      </MenuContext.Provider> 
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0'
}

export default Menu