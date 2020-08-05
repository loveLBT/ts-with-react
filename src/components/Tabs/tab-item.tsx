import React, { useContext } from 'react'
import classnames from 'classnames'

import { TabsContext } from './tabs'
import { TabItemProps } from './types'

const TabItem: React.FC<TabItemProps> = (props) => {
  const { 
    title,
    index,
    disabled
   } = props
  const TabsContextValue = useContext(TabsContext)
  const { currentIndex, onSelect } = TabsContextValue
  const isActive: boolean = currentIndex === index
  const handleSelect = () => {
    if(onSelect && typeof index === 'number' && !disabled) {
      onSelect(index)
    }
  }
  const classes = classnames('tabs-nav-item', {
    'active': isActive,
    'disabled': disabled
  })
  return (
    <li 
      className={classes}
      onClick={handleSelect}
    >
      {title}
    </li>
  )
}

TabItem.displayName = 'TabItem'

export default TabItem