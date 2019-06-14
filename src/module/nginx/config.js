import React from 'react'
import { Button, notification, Col } from 'antd'
import Nginxs, { Nginx } from './model'
const NginxRequest = new Nginx()

const columns = [
  {
    title: 'upstream名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      return {
        children: text,
        props: {
          rowSpan: record.nameRowSpan,
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: 'Nginx IP:端口',
    dataIndex: 'ng_port',
    key: 'ng_port',
    render: (text, record) => {
      return {
        children: `${record.ng_ip}:${record.ng_port}`,
        props: {
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: 'nginx配置状态',
    dataIndex: 'ng_status',
    key: 'ng_status',
    render: (text, record) => {
      return {
        children: text,
        props: {
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: 'zk IP:端口',
    dataIndex: 'zk_ip',
    key: 'zk_ip',
    render: (text, record) => {
      return {
        children: `${record.zk_ip}:${record.zk_port}`,
        props: {
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: 'zk注册状态',
    dataIndex: 'zk_status',
    key: 'zk_status',
    render: (text, record) => {
      return {
        children: text,
        props: {
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: '节点操作',
    dataIndex: 'node_action',
    key: 'node_action',
    render: (text, record) => {
      return {
        children: (
          <Button
            type="danger"
            onClick={() => {
              NginxRequest.deleteNginxNode({
                name: record.name,
                port: record.ng_port,
                ip: record.ng_ip,
              })
                .then(data => {
                  return Nginxs.getNginxList()
                })
                .then(data => {
                  console.log(data)
                  notification.success({ message: '成功' })
                })
            }}>
            摘除ng配置
          </Button>
        ),
        props: {
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
  {
    title: 'upstream操作',
    dataIndex: 'upstream_action',
    key: 'upstream_action',
    width: '200px',
    render: (text, record) => {
      return {
        children: (
          <Col span={2}>
            <Button type="danger" style={{ marginBottom: '5px' }}>
              摘除全部ng配置
            </Button>
            <Button type="primary" style={{ marginBottom: '5px' }}>
              按zk同步ng配置
            </Button>
            <Button type="primary" style={{ marginBottom: '5px' }}>
              开启自动同步
            </Button>
          </Col>
        ),
        props: {
          rowSpan: record.nameRowSpan,
          style: { background: record.oddRow ? '#fffbe6' : '#e6fffb' },
        },
      }
    },
  },
]

export { columns }
