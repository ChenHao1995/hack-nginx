import React, { Component } from 'react'
import { inject, observer } from 'backbone-react'
import { Input, Button } from 'fiiish-general'
import users from './model'
import styles from './style.module.less'
import { UiState } from 'src/store/ui-state'

@inject('uiState', { users })
@observer
class Home extends Component<{ uiState: UiState }> {
  state = {
    name: '',
  }
  async(name) {
    return new Promise((resolve, reject) => {
      this.props.uiState.set(name, true)
      _.delay(() => {
        resolve()
        this.props.uiState.set(name, false)
      }, 1000)
    })
  }
  addUser = () => {
    this.async('loadingAdd').then(() => users.add({ name: this.state.name }))
  }
  delUser = user => {
    this.async(`loadingDel-${user.cid}`).then(() => user.destroy())
  }
  render() {
    const { uiState } = this.props
    const Users = users.map(user => (
      <div className={styles.name} key={user.cid}>
        {user.attributes.name}
        <Button
          loading={uiState.get(`loadingDel-${user.cid}`)}
          onClick={this.delUser.bind(this, user)}
          htmlType="button"
          type="danger"
          size="small">
          删除
        </Button>
      </div>
    ))

    return (
      <div className={styles.user}>
        <h3>用户</h3>
        <Input
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <Button
          onClick={this.addUser}
          type="primary"
          htmlType="button"
          loading={!!uiState.attributes.loadingAdd}>
          添加
        </Button>
        {Users}
      </div>
    )
  }
}

export default Home
