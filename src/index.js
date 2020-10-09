import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import Schedule from './Schedule'

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Schedule />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
