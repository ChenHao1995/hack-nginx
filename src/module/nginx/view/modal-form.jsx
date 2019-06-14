import React, { Component } from 'react'
import { Modal, Form, Input, Button, Icon } from 'antd'
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
    const { form } = this.props
    const { validateFields } = form
    validateFields((err, values) => {
      console.log(err, values)
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  render() {
    const { form, ...rest } = this.props
    const { getFieldDecorator } = form
    const upstremLoadList = this.state.form.upstremLoad

    return (
      <Modal onOk={this.onOk} {...rest} okText="提交">
        <Form
          layout="vertical"
          onSubmit={() => {
            alert('tijiao')
          }}>
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
          <Form.Item label="upstrem负载">
            {upstremLoadList.map((v, i) => {
              return (
                <div>
                  {getFieldDecorator(`upstremLoadPort-${v}`)(
                    <Input
                      style={{ width: '46%', marginBottom: '10px' }}
                      placeholder="ip"
                    />
                  )}
                  {getFieldDecorator(`upstremLoadIP-${v}`)(
                    <Input
                      style={{
                        width: '46%',
                        marginBottom: '10px',
                        marginLeft: '5px',
                        marginRight: '5px',
                      }}
                      placeholder="端口"
                    />
                  )}
                  {this.state.form.upstremLoad.length === 1 ? null : (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      style={{ fontSize: '20px' }}
                      onClick={this.removeUpstremLoad.bind(null, v)}
                    />
                  )}
                </div>
              )
            })}

            <Button
              type="dashed"
              onClick={this.addUpstremLoad}
              style={{ width: '100%', marginTop: '10px' }}>
              <Icon type="plus" /> 增加upstrem负载
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'ModalForm' })(ModalForm)
