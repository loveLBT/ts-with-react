import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { MenuProps } from './types'
import Menu from './menu'
import MenuItem from './menu-item'

const baseProps: MenuProps = {
  className: 'jellal',
  onSelect: jest.fn()
}
const verticalMenuProps: MenuProps = {
  mode: 'vertical'
}

const BaseMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem>one</MenuItem>
      <MenuItem>two</MenuItem>
      <MenuItem disabled>three</MenuItem>
    </Menu>
  )
}

let 
  wrapper: RenderResult,
  menuElement: HTMLElement,
  oneMenuItemElement: HTMLElement,
  twoMenuItemElement: HTMLElement,
  threeMenuItemElement: HTMLElement
describe('Menu组件测试', () => {
  beforeEach(() => {
    wrapper = render(<BaseMenu {...baseProps} />)
    const container = wrapper.container
    menuElement = container.getElementsByClassName('menu')[0] as HTMLElement
    oneMenuItemElement = wrapper.getByText('one')
    twoMenuItemElement = wrapper.getByText('two')
    threeMenuItemElement = wrapper.getByText('three')
  })

  it('根据默认属性渲染Menu', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu jellal')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(oneMenuItemElement).toHaveClass('menu-item active')
    expect(threeMenuItemElement).toHaveClass('menu-item disabled')
  })

  it('测试MenuItem上的点击事件', () => {
    fireEvent.click(twoMenuItemElement)
    expect(baseProps.onSelect).toHaveBeenCalledWith('1')
    expect(twoMenuItemElement).toHaveClass('active')
    expect(oneMenuItemElement).not.toHaveClass('active')
  
    fireEvent.click(threeMenuItemElement)
    expect(baseProps.onSelect).not.toHaveBeenCalledWith('2')
    expect(threeMenuItemElement).toHaveClass('disabled')
    expect(threeMenuItemElement).not.toHaveClass('active')
    expect(twoMenuItemElement).toHaveClass('active')
  })

  it('测试Menu mode=vetical时的状态', () => {
    const wrapper = render(<BaseMenu {...verticalMenuProps} />)
    const container = wrapper.container
    const menuElement = container.getElementsByClassName('menu')[0] as HTMLElement
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
  })
})