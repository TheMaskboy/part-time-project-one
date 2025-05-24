import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Table,
  type TableProps,
} from 'antd'
import dayjs from 'dayjs'
import './style.scss'
import { useRef, useState } from 'react'
import PeopleAdd from '../../../components/people/add'
import type { PeopleItem } from '../../../type/people'
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

  const [selectPeople, setSelectPeople] = useState<PeopleItem[]>([])
  const [selectCurrentPeople, setSelectCurrentPeople] = useState<PeopleItem[]>(
    []
  )
  const childRef = useRef({}) as React.MutableRefObject<any>

  const columns: TableProps<PeopleItem>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: '1',
      width: 100,
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center',
    },
    {
      title: '基本信息',
      dataIndex: 'detail',
      key: '3',
      width: 300,
      align: 'center',
      render: (_, item: PeopleItem) => {
        return (
          <div className="detail">
            <div className="detail-item">年龄：{item.age}</div>
            <div className="detail-item">生日：{item.birthday}</div>
            <div className="detail-item">身高：{item.raise}</div>
            <div className="detail-item">体重：{item.weight}</div>
            <div className="detail-item">照片：</div>
          </div>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: '4',
      width: 100,
      align: 'center',
      render: (_, item: PeopleItem) => {
        return (
          <Button type="primary" onClick={() => deletePeople(item)}>
            删除
          </Button>
        )
      },
    },
  ]

  const deletePeople = (value: PeopleItem) => {
    const index = selectCurrentPeople.findIndex((item) => item.id === value.id)
    selectCurrentPeople.splice(index, 1)
    setSelectCurrentPeople([...selectCurrentPeople])
    childRef.current.updatePeople(selectCurrentPeople)
  }

  const selectPeoples = (value: PeopleItem[]) => {
    setSelectPeople(value)
  }

  const onClickAddPeople = () => {
    setIsShowModal(false)
    setSelectCurrentPeople(selectPeople)
  }

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
      <Table<PeopleItem>
        columns={columns}
        rowKey="id"
        dataSource={selectCurrentPeople}
        bordered
      />
      <div className="btns">
        <Button type="primary">确认</Button>
        <Button>取消</Button>
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
            <Button type="primary" onClick={onClickAddPeople}>
              确认添加
            </Button>
            <Button onClick={() => setIsShowModal(false)}>取消</Button>
          </div>
        }
      >
        <PeopleAdd ref={childRef} selectPeoples={selectPeoples} />
      </Modal>
    </div>
  )
}

export default ProjectCreate
