import { Button, Form, Input } from 'antd'
import './style.scss'
import { apiPostLogin } from '../../api/user'

const UserLogin = () => {
  type UserLoginType = {
    account: string
    password: string
  }

  const [form] = Form.useForm<UserLoginType>()

  const submit = () => {
    form.validateFields().then((res) => {
      const { account, password } = res
      apiPostLogin({ account, password })
    })
  }

  return (
    <div className="login">
      <div className="inner">
        <div className="title">登录</div>
        <Form form={form} className="form">
          <Form.Item
            label=""
            name="account"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item className="btns">
            <Button type="primary" onClick={submit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UserLogin
