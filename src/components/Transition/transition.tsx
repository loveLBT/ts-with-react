import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'

interface TranstionProps extends CSSTransitionProps {
  animation?: AnimationName;
  // 给组件子元素包裹一层div，避免子元素中得css transtion效果与CSSTranstion 得效果冲突
  wrapper?: boolean;
}

const Transtion: React.FC<TranstionProps> = (props) => {
  const { animation, wrapper, classNames, children, ...restProps } = props
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation }
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transtion.defaultProps = {
  appear: true,
  unmountOnExit: true
}

export default Transtion