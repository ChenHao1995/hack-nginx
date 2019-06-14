import React, { Component } from 'react'
import { Modal, Form, Input, Button, Icon, Row, Col } from 'antd'
import _ from 'lodash'

class ModalForm extends Component {
  state = {
    form: {
      upstremLoad: [1],
    },
  }
  addUpstremLoad = () => {
    this.setState(pres => {
      const upstremLoad = pres.form.upstremLoad
      const length = upstremLoad.length
      let lastOne = upstremLoad[length - 1]
      upstremLoad.push(++lastOne)
      return {
        form: {
          upstremLoad,
        },
      }
    })
  }
  removeUpstremLoad = key => {
    const upstremLoad = this.state.form.upstremLoad
    if (upstremLoad.length === 1) {
      return
    }
    this.setState(pres => {
      const upstremLoad = pres.form.upstremLoad
      return {
        form: {
          upstremLoad: upstremLoad.filter(v => v !== key),
        },
      }
    })
  }
  onOk = () => {
    const { form, onOk } = this.props
    const { validateFields } = form
    validateFields((err, values) => {
      if (err) {
        return
      }

      const upstremLoad = []
      const upstremLoadKeys = this.state.form.upstremLoad
      upstremLoadKeys.forEach((v, i) => {
        upstremLoad.push({
          port: values[`upstremLoadPort-${v}`],
          ip: values[`upstremLoadIP-${v}`],
        })
      })

      var data = {
        upstremName: values.upstremName,
        upstremLoad,
      }
      console.log(data)
      if (typeof onOk === 'function') {
        onOk(data)
      }
    })
  }
  render() {
    const { form, ...rest } = this.props
    const { getFieldDecorator } = form
    const upstremLoadList = this.state.form.upstremLoad

    return (
      <Modal onOk={this.onOk} {...rest} okText="提交">
        <Form layout="vertical">
          <Form.Item label="upstrem名称">
            {getFieldDecorator('upstremName', {
              rules: [
                {
                  required: true,
                  message: '请输入upstrem名称',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                <span style={{ color: '#f5222d' }}>*</span> upstrem负载
              </span>
            }>
            {upstremLoadList.map((v, i) => {
              return (
                <Row>
                  <Col span={11}>
                    <Form.Item>
                      {getFieldDecorator(`upstremLoadIP-${v}`, {
                        rules: [
                          {
                            required: true,
                            message: '请输入upstremIP',
                          },
                        ],
                      })(<Input placeholder="ip" />)}
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item>
                      {getFieldDecorator(`upstremLoadPort-${v}`, {
                        rules: [
                          {
                            required: true,
                            message: '请输入upstrem端口',
                          },
                        ],
                      })(
                        <Input
                          style={{
                            marginLeft: '5px',
                            marginRight: '5px',
                          }}
                          placeholder="端口"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  {this.state.form.upstremLoad.length === 1 ? null : (
                    <Col span={1} offset={1}>
                      <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        style={{ fontSize: '20px', marginTop: '5px' }}
                        onClick={this.removeUpstremLoad.bind(null, v)}
                      />
                    </Col>
                  )}
                </Row>
              )
            })}
            <div>
              <Button
                type="dashed"
                onClick={this.addUpstremLoad}
                style={{ width: '100%', marginTop: '10px' }}>
                <Icon type="plus" /> 增加upstrem负载
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'ModalForm' })(ModalForm)
