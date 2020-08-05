import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

type Theme = 'primary' | 'success' | 'warning' | 'danger'

interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props
  const classes = classnames('icon', className, {
    [`icon-${theme}`]: theme
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon