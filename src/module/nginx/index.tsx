import React, { Component } from 'react'
import {
  Layout,
  Breadcrumb,
  Table,
  Select,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
} from 'antd'
import { columns } from './config'
import ModalForm from './view/modal-form'
import { inject, observer } from 'backbone-react'
import Nginxs, { Nginx } from './model'
const { Header, Footer, Sider, Content } = Layout
const { Option } = Select

@inject('uiState', { Nginxs, Nginx })
@observer
class NginxConfig extends Component<{ form: any; Nginxs: any }> {
  state = {
    visible: false,
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  handleModal = action => {
    this.setState({
      visible: action,
    })
  }
  render() {
    const { form, Nginxs } = this.props
    const { getFieldDecorator } = form
    console.log(this.props)
    const dataSource = Nginxs.toJSON()

    return (
      <Layout>
        <Header>Header</Header>
        <Content style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <Select
              defaultValue="T1"
              style={{ width: '200px', marginRight: '10px' }}
              onChange={() => {}}>
              <Option value="jack">T1</Option>
              <Option value="lucy">T2</Option>
            </Select>
            <Button
              type="primary"
              onClick={this.handleModal.bind(null, true)}
              style={{ marginRight: '10px' }}>
              新增upstrem配置
            </Button>
            <Button type="primary" style={{ marginRight: '10px' }}>
              备份Nginx配置文件
            </Button>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
          />
        </Content>
        {/* <Footer>Footer</Footer> */}
        <ModalForm
          visible={this.state.visible}
          title="新增upstream（支持非注册到zk的服务）"
          onCancel={this.handleModal.bind(null, false)}
        />
      </Layout>
    )
  }
}

export default Form.create({ name: 'nginx' })(NginxConfig)
