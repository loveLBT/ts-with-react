import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { TabsProps, TabItemProps, TabItems, TabContainer, TabsContextValueProps } from './types'

export const TabsContext = React.createContext<TabsContextValueProps>({})

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    mode,
    children,
    onSelect,
    className
  } = props
  const [ currentIndex, setCurrentIndex ] = useState<number>(defaultIndex as number)
  const [ tabItems, setTabItems ] = useState<TabItems>([])
  const [ tabContainer, setTabContainer ] = useState<TabContainer>('')
  const handleSelect = (index: number) => {
    setCurrentIndex(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const tabContextValue: TabsContextValueProps = {
    currentIndex,
    onSelect: handleSelect
  }

  const classes = classnames('tabs', className, `tabs-${mode}`)
  useEffect(() => {
    const items: TabItems = []
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      const { children, ...oldChildProps } = childElement.props
      if(displayName === 'TabItem') {
        const newChildProps = {
          index,
          key: oldChildProps.index || index,
          ...oldChildProps
        }
        const TabItem = React.cloneElement(
          childElement,
          {...newChildProps}
        )
        items.push(TabItem)
        if(currentIndex === newChildProps.index) {
          setTabContainer(children)
        }
      }else {
        console.error('Tabs组件的子组件必须是TabItem组件')
      }
    })
    setTabItems(items)
  }, [children, currentIndex])
  
  return (
   <div className={classes}>
     <TabsContext.Provider value={tabContextValue}>
      <ul className='tabs-nav'>
          {tabItems}
        </ul>
        <div className='tabs-content'>
          {tabContainer}
        </div>
     </TabsContext.Provider>
   </div>
  )
}

Tabs.defaultProps = {
  mode: 'line',
  defaultIndex: 0
}

export default Tabs