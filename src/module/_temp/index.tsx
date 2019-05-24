import React, { Component } from 'react'
import { inject, observer } from 'backbone-react'
import stores from './model'
import styles from './style.module.less'

@inject({ stores })
@observer
class Temp extends Component {
  state = {}
  render() {
    return <div className={styles.temp}>Temp</div>
  }
}

export default Temp
