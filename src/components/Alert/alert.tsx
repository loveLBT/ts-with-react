import React from 'react'
import classnames from 'classnames'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string;
  description?: string;
  alertType?: AlertType;
  onClose?: () => void;
  closable?: boolean
}

const Alert: React.FC<AlertProps>= (props) => {
  const {
    title,
    description,
    alertType,
    onClose,
    closable
  } = props
  const classes = classnames('alert', {
    [`alert-${alertType}`]: alertType,
  })
  const titleClassNames = classnames('alert-title', {
    'alert-bold': description
  })
  return (
    <div className={classes}>
      <span className={titleClassNames}>{title}</span>
      {description && 
        <p className='alert-desc'>{description}</p>
      }
      {closable && 
        <span onClick={onClose} className='alert-close'>关闭</span>
      }
    </div>
  )
}

Alert.defaultProps = {
  alertType: 'default',
  closable: true
}

export default Alert