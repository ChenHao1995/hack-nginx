import React, { Component } from 'react'
import logo from './logo.svg'
import styles from './App.module.less'
import { TextField } from 'fiiish-general'
import './App.less'

const AppWrap = (Comp: any): any => (): any => (
  <div className="wrap">
    <Comp />
  </div>
)

@AppWrap
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className={styles.module}>test</span>
          <TextField />
          <img src={logo} className="App-logo" alt="logo" />
          <p>env: {process.env.API_DOMAIN}</p>
          <p>
            Edit2 <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
