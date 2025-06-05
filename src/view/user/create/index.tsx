import { Button, DatePicker, Form, Input, message, Modal } from 'antd'
import type { CustomType, PeopleEditType } from '../../../type/people'
import PeopleEidtItem from './item'
import UserImage from './userImage'
import './style.scss'
import { useEffect, useState } from 'react'
import Custom from './custom'
import { apiGetUserDetail, apiPostCreateUser } from '../../../api/user'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'

const UserCreate = () => {
  interface PeopleType extends PeopleEditType {
    photo?: {
      image: {
        imgUrl?: string
        file?: Blob
      }[]
    }
    propertyVos?: CustomType[]
  }

  const navigate = useNavigate()

  const [form] = Form.useForm<PeopleType>()
  const [isShowModal, setIsShowModal] = useState(false)
  const [addMessage, setAddMessage] = useState('')
  const [customList, setCustomList] = useState<CustomType[]>([])
  const [loading, setLoading] = useState(false)
  const id = useParams()?.id

  const onClickSubmit = () => {
    const arr = {
      name: addMessage,
      value: "",
      show: 0
    }
    customList.push(arr)
    setCustomList([...customList])
    setIsShowModal(false)
  }

  useEffect(() => {
    if (!id) return
    apiGetUserDetail(Number(id)).then(res => {
      const { nickname, birthday, height, weight, propertyVos } = res
      form.setFieldValue("nickname", nickname)
      form.setFieldValue("birthday", dayjs(birthday))
      form.setFieldValue("height", height)
      form.setFieldValue("weight", weight)
      setCustomList(propertyVos)
    })
  }, [id])

  const update = () => {
    form.validateFields().then((res) => {
      setLoading(true)
      console.log(res)
      return
      const { nickname, birthday, height, weight } = res
      const params: PeopleType = {
        nickname,
        birthday: dayjs(birthday).format("YYYY-MM-DD"),
        height,
        weight,
        propertyVos: customList
      }
      if (!!id) {
        params.id = Number(id)
      }
      apiPostCreateUser(params).then(() => {
        message.success("修改成功")
        navigate("/user/list", {
          replace: true

        })
      }).finally(() => {
        setLoading(false)
      })
    })
  }

  const updateCustomList = (value: CustomType) => {
    const index = customList.findIndex(item => item.name === value.name) || 0
    customList[index] = value
    setCustomList([...customList])
  }

  return (
    <div>
      <Form style={{ width: '400px' }} className='form' form={form}>
        <Form.Item
          label="用户昵称"
          name="nickname"
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
          <DatePicker format="YYYY-MM-DD" disabledDate={(current) => current && current > dayjs().endOf('day')} placeholder="请选择生日" />
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
          name="height"
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
            <Form.Item
              label={item.name} required>
              <Custom
                custom={item}
                customList={customList}
                updateCustomList={(e) => updateCustomList(e)}
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
          <Button onClick={update} type="primary" loading={loading}>
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
            <Button type="primary" onClick={onClickSubmit} loading={loading}>
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
