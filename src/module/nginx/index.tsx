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
} from 'antd'
import { columns } from './config'
import ModalForm from './view/modal-form'
const { Header, Footer, Sider, Content } = Layout
const { Option } = Select

class Nginx extends Component<{ form: any }> {
  constructor(props) {
    super(props)
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ]

    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Layout>
        <Header>Header</Header>

        <Content>
          <div>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={() => {}}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </Content>
        <Footer>Footer</Footer>
        {/* <Modal
          title="新增upstream（支持非注册到zk的服务）"
          visible={true}
          onOk={() => {}}
          onCancel={() => {}}>
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal> */}
        <ModalForm
          visible={true}
          title="新增upstream（支持非注册到zk的服务）"
        />
      </Layout>
    )
  }
}

export default Form.create({ name: 'nginx' })(Nginx)
