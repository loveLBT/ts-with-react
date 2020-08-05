import React, { InputHTMLAttributes } from 'react'
import classnames from 'classnames'

import Icon from '../Icon/icon'
import { BaseInputProps } from './types'

const Input: React.FC<BaseInputProps> = (props) => {
  const {
    className,
    disabled,
    size,
    placeholder,
    icon
  } = props
  const classes = classnames("input-wrapper", className, {
    "disabled": disabled,
    [`input-size-${size}`]: size
  })
  return (
    <div className={classes}>
      <input
        className="input"
        disabled={disabled}
        placeholder={placeholder}
        type="password"
      />
      {icon && 
        <span className="input-icon">
          <Icon className="icon" icon="angle-down" />
        </span>
      }
      
    </div>
  )
}

export default Input

// basic
// <input className="input" />

// size
// lg md sm
// <input className="input-size-lg input" />

