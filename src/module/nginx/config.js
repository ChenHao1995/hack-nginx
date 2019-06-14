import React from 'react'
import { Button, notification } from 'antd'
import { Nginx } from './model'
const NginxRequest = new Nginx()
const columns = [
  {
    title: 'upstream名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      return {
        children: text,
        props: { rowSpan: record.nameRowSpan },
      }
    },
  },
  {
    title: 'Nginx IP:端口',
    dataIndex: 'ng_port',
    key: 'ng_port',
    render: (text, record) => {
      console.log(record)
      return `${record.ng_ip}:${record.ng_port}`
    },
  },
  {
    title: 'nginx配置状态',
    dataIndex: 'ng_status',
    key: 'ng_status',
  },
  {
    title: 'zk IP:端口',
    dataIndex: 'zk_ip',
    key: 'zk_ip',
    render: (text, record) => {
      return `${record.zk_ip}:${record.zk_port}`
    },
  },
  {
    title: 'zk注册状态',
    dataIndex: 'zk_status',
    key: 'zk_status',
  },
  {
    title: '节点操作',
    dataIndex: 'node_action',
    key: 'node_action',
    render: (text, record) => {
      return (
        <Button
          type="danger"
          onClick={() => {
            NginxRequest.deleteNginxNode({
              name: record.name,
              port: record.ng_port,
              ip: record.ng_ip,
            }).then(data => {
              notification.success({ message: '成功' })
            })
          }}>
          摘除ng配置
        </Button>
      )
    },
  },
  {
    title: 'upstream操作',
    dataIndex: 'upstream_action',
    key: 'upstream_action',
    render: (text, record) => {
      return {
        children: (
          <div>
            <Button type="danger" style={{ marginBottom: '5px' }}>
              摘除全部ng配置
            </Button>
            <Button type="primary" style={{ marginBottom: '5px' }}>
              按zk同步ng配置
            </Button>
            <Button type="primary" style={{ marginBottom: '5px' }}>
              开启自动同步
            </Button>
          </div>
        ),
        props: { rowSpan: record.nameRowSpan },
      }
    },
  },
]

export { columns }
