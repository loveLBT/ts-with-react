import React from 'react'
import classnames from 'classnames'

import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = (props) => {
  const { 
    href,
    btnType,
    size,
    disabled,
    className,
    children,
    ...restProps 
  } = props
  const isLink = btnType === 'link' && href
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': isLink && disabled
  })
  if(isLink) {
    return (
      <a 
        className={classes} 
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  }else {
    return (
      <button 
        className={classes} 
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: 'default',
  disabled: false
}

export default Button