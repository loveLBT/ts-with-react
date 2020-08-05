import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'Jellal'
}
const linkProps: ButtonProps = {
  btnType: 'link',
  href: 'http://www.baidu.com'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

// 分类
describe('测试buttong组件', () => {
  it('根据默认属性渲染button', () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText('button') as HTMLButtonElement // 断言element 为 button element
    expect(element).toBeInTheDocument()               // 测试是否渲染到document上
    expect(element.tagName).toEqual('BUTTON')         // 测试react组件的tagName 与字符串"BUTTON"是否一致
    expect(element).toHaveClass('btn btn-default')    // 测试element上是否含有'btn'与'btn-default'两个class
    expect(element.disabled).toBeFalsy()              //  测试默认button disbaled为false
    
    // 测试用户与buttong的交互
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('根据button基础属性渲染button', () => {
    const wrapper = render(<Button {...testProps}>button</Button>)
    const element = wrapper.getByText('button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg Jellal')
  })
  it('根据btnType为link并且href被提供时 渲染a链接', () => {
    const wrapper = render(<Button {...linkProps}>link</Button>)
    const element = wrapper.getByText('link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A') 
    expect(element).toHaveClass('btn btn-link')
  })
  it('根据disabled的属性渲染button', () => {
    const wrapper = render(<Button {...disabledProps}>button</Button>)
    const element = wrapper.getByText('button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()

    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})