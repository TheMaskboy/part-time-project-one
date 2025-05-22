import { Button, DatePicker, Form, Input, Modal } from 'antd'
import dayjs from 'dayjs'
import './style.scss'
import { useState } from 'react'
import PeopleAdd from '../../../components/people/add'

interface FormType {
  name: string
  description: string
  cycle: string[]
}

const ProjectCreate = () => {
  const [form] = Form.useForm<FormType>()
  const { RangePicker } = DatePicker
  const [isShowModal, setIsShowModal] = useState(false)

  const onClickSubmit = () => {}

  return (
    <div>
      <Form style={{ width: '400px' }} form={form}>
        <Form.Item name="name" required label="项目名称">
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item name="description" required label="项目简介">
          <Input.TextArea placeholder="请输入项目简介" />
        </Form.Item>
        <Form.Item name="cycle" required label="项目周期">
          <RangePicker
            minDate={dayjs(dayjs().subtract(0, 'day'))}
            format="YYYY-MM-DD"
            placeholder={['请选择时间', '请选择时间']}
          />
        </Form.Item>
      </Form>
      <div className="people">
        <div className="btn">
          人员信息：
          <Button type="primary" onClick={() => setIsShowModal(true)}>
            添加人员
          </Button>
        </div>
      </div>

      <Modal
        title="添加人员"
        width={800}
        open={isShowModal}
        centered
        onCancel={() => setIsShowModal(false)}
        footer={
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <Button type="primary" onClick={onClickSubmit}>
              新增人员
            </Button>
            <Button type="primary" onClick={onClickSubmit}>
              确认添加
            </Button>
            <Button onClick={() => setIsShowModal(false)}>取消</Button>
          </div>
        }
      >
        <PeopleAdd />
      </Modal>
    </div>
  )
}

export default ProjectCreate
