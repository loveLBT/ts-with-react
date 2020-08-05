import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

export type BtnType = 'primary' | 'danger' | 'link' | 'default'
export type BtnSize = 'lg' | 'sm'
interface BaseButtonProps {
  href?: string;
  btnType?: BtnType;
  size?: BtnSize;
  disabled?: Boolean;
  className?: string;
  children?: React.ReactNode;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement> 
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>