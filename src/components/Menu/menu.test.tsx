import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menu-item'

const baseMenuProps: MenuProps = {
  className: 'test',
  onSelect: jest.fn()
}
const verticalMenuProps: MenuProps = {
  mode: 'vertical'
}

const BaseMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu  {...props}>
      <MenuItem index={'0'}>
        active
      </MenuItem>
      <MenuItem disabled={true} index={'1'}>
        disabled
      </MenuItem>
      <MenuItem index={'2'}>
        MenuItem3
      </MenuItem>
    </Menu>
  )
}

let 
  wrapper: RenderResult, 
  menuElement: HTMLElement, 
  activeMenuItemElement: HTMLElement, 
  disabledMenuItemElement: HTMLElement
describe('测试menu和menu-item组件', () => {
  // 测试之前都会执行
  beforeEach(() => {
    wrapper = render(<BaseMenu {...baseMenuProps} />)
    const container: HTMLElement = wrapper.container
    menuElement = container.getElementsByClassName('menu')[0] as HTMLElement
    activeMenuItemElement = wrapper.getByText('active')
    disabledMenuItemElement = wrapper.getByText('disabled')
  })
  it('根据基础属性渲染menu和menu-item组件', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // 测试menuElement下面是否有3个li子节点
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeMenuItemElement).toHaveClass('menu-item active')
    expect(disabledMenuItemElement).toHaveClass('menu-item disabled')
  })
  it('根据点击menu-item点击事件触发menu的回调(disabled=true无法点击)', () => {
    // 测试点击MenuItem3时触发的事件
    const thirdMenuItemElement: HTMLElement = wrapper.getByText('MenuItem3')
    fireEvent.click(thirdMenuItemElement)
    expect(thirdMenuItemElement).toHaveClass('active')
    expect(activeMenuItemElement).not.toHaveClass('active')
    expect(baseMenuProps.onSelect).toHaveBeenCalledWith("2")

    // 测试点击disabled menu-item时触发的事件
    fireEvent.click(disabledMenuItemElement)
    expect(disabledMenuItemElement).not.toHaveClass('active')
    expect(disabledMenuItemElement).toHaveClass('disabled')
    expect(baseMenuProps.onSelect).not.toHaveBeenCalledWith("1")
  })
  it('根据mode=vertical渲染menu与menu-item组件', () => {
    // 清除render函数的渲染
    cleanup()
    const wrapper: RenderResult = render(<BaseMenu {...verticalMenuProps} />)
    const container: HTMLElement = wrapper.container
    const menuElement: HTMLElement = container.getElementsByClassName('menu')[0] as HTMLElement
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
  })
})