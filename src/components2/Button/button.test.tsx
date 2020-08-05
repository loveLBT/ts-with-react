import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'
import { BtnType, BtnSize, ButtonProps } from './types'

const defaultProps: ButtonProps = {
  onClick: jest.fn()
}
const basicProps: ButtonProps = {
  btnType: 'primary',
  size: 'sm',
  className: 'Jellal'
}
const anChorProps: ButtonProps = {
  href: 'https://www.baidu.com',
  btnType: 'link'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe("测试button组件", () => {
  it("根据默认属性渲染button", () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText("button") as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON")
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()

    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it("根据基础属性渲染button", () => {
    const wrapper = render(<Button {...basicProps}>basic</Button>)
    const element = wrapper.getByText('basic')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn Jellal btn-primary btn-sm')
  })
  it("根据btnType为link并且href被提供时 渲染a链接", () => {
    const wrapper = render(<Button {...anChorProps}>link</Button>)
    const element = wrapper.getByText("link") as HTMLAnchorElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("A")
    expect(element).toHaveClass('btn btn-link')
    expect(element.href).toMatch(/www.baidu.com/)//toEqual("https://www.baidu.com/")
  })
  it("根据disabled的属性渲染button", () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
  })
})