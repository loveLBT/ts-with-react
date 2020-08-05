import React from 'react'
import Input from './components/Input/input'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tab-item'

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{width: "300px", marginTop: "60px", marginLeft: "200px"}}>
        <Input 
          placeholder="请输入。。。" 
        />
      </div>
      
    </div>
  );
}

export default App;
