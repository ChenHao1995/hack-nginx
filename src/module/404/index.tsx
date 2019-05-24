import React, { Component } from 'react'
import styles from './style.module.less'

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.notFound}>
        <div>
          <h2>未找到页面</h2>
          <a href="/">返回首页</a>
        </div>
      </div>
    )
  }
}
