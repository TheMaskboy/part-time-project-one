import { Button, Form, Input } from 'antd'
import './style.scss'

const UserLogin = () => {
  type UserLoginType = {
    name: string
    password: string
  }

  const [form] = Form.useForm<UserLoginType>()

  return (
    <div className="login">
      <Form form={form}>
        <Form.Item label="用户名">
          <Input name="name" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码">
          <Input.Password name="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item className="btns">
          <Button type="primary">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserLogin
