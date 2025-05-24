import { Button, DatePicker, Form, Input, Modal } from 'antd'
import type { PeopleEditType } from '../../../type/people'
import PeopleEidtItem from './item'
import UserImage from './userImage'
import './style.scss'
import { useState } from 'react'
import Custom from './custom'

const UserCreate = () => {
  interface PeopleType extends PeopleEditType {
    photo: {
      image: {
        imgUrl?: string
        file?: Blob
      }[]
    }
    custom: string[][]
  }

  const [form] = Form.useForm<PeopleType>()
  const [isShowModal, setIsShowModal] = useState(false)
  const [addMessage, setAddMessage] = useState('')
  const [customList, setCustomList] = useState<string[][]>([])

  const onClickSubmit = () => {
    const arr = [addMessage]
    customList.push(arr)
    setCustomList([...customList])
    setIsShowModal(false)
  }

  const update = () => {
    form.validateFields().then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <Form style={{ width: '400px' }} form={form}>
        <Form.Item
          label="用户昵称"
          name="name"
          rules={[
            {
              required: true,
              message: '请选择用户昵称',
            },
          ]}
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item
          label="用户生日"
          name="birthday"
          rules={[
            {
              required: true,
              message: '请选择用户生日',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" placeholder="请选择生日" />
        </Form.Item>
        <Form.Item
          label="用户身高"
          validateTrigger={['onSubmit', 'onBlur']}
          rules={[
            {
              validator: (_, value: { value: string }) => {
                if (!value.value) {
                  return Promise.reject('请输入用户身高')
                }
                return Promise.resolve()
              },
            },
          ]}
          name="raise"
          required
        >
          <PeopleEidtItem name="身高" />
        </Form.Item>
        <Form.Item
          label="用户体重"
          name="weight"
          validateTrigger={['onSubmit', 'onBlur']}
          rules={[
            {
              validator: (_, value: { value: string }) => {
                if (!value.value) {
                  return Promise.reject('请输入用户体重')
                }
                return Promise.resolve()
              },
            },
          ]}
          required
        >
          <PeopleEidtItem name="体重" />
        </Form.Item>
        {customList.map((item) => {
          return (
            <Form.Item key={item[0]} label={item[0]} required>
              <Custom
                custom={item}
                customList={customList}
                updateCustomList={(e) => setCustomList(e)}
              />
            </Form.Item>
          )
        })}
        <Button
          type="primary"
          onClick={() => setIsShowModal(true)}
          className="add"
        >
          新增信息
        </Button>
        <Form.Item label="用户照片" name="photo" required>
          <UserImage />
        </Form.Item>
        <div className="btns">
          <Button onClick={update} type="primary">
            确定修改
          </Button>
        </div>
      </Form>

      <Modal
        title="新增信息"
        width={800}
        open={isShowModal}
        centered
        onCancel={() => setIsShowModal(false)}
        destroyOnHidden
        footer={
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <Button type="primary" onClick={onClickSubmit}>
              确定
            </Button>
            <Button onClick={() => setIsShowModal(false)}>取消</Button>
          </div>
        }
      >
        <Input
          placeholder="请输入信息"
          onChange={(e) => setAddMessage(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default UserCreate
