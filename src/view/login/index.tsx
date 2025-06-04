import { Button, Form, Input, message } from 'antd'
import './style.scss'
import { apiPostLogin, getUserDetail } from '../../api/user'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  type UserLoginType = {
    account: string
    password: string
  }

  const navigate = useNavigate()

  const [form] = Form.useForm<UserLoginType>()

  const submit = () => {
    form.validateFields().then(async (res) => {
      const { account, password } = res
      const returnCode = await apiPostLogin({ account, password })
      localStorage.setItem("auth_token", String(returnCode))
      message.success("登录成功")
      const detail = await getUserDetail()
      localStorage.setItem("userDetail", JSON.stringify(detail))
      navigate("/", { replace: true })
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
