import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Table,
  type TableProps,
} from 'antd'
import dayjs from 'dayjs'
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import PeopleAdd from '../../../components/people/add'
import type { PeopleItem } from '../../../type/people'
import { apiPostProjectCreate } from '../../../api/project'
import { useNavigate } from 'react-router-dom'
import { getUserList } from '../../../api/user'
interface FormType {
  name: string
  desc: string
  cycle: string[]
}

const ProjectCreate = () => {
  const [form] = Form.useForm<FormType>()
  const { RangePicker } = DatePicker
  const [isShowModal, setIsShowModal] = useState(false)

  const onClickSubmit = () => { }

  const [selectPeople, setSelectPeople] = useState<PeopleItem[]>([])
  const [selectCurrentPeople, setSelectCurrentPeople] = useState<PeopleItem[]>(
    []
  )
  const childRef = useRef({}) as React.MutableRefObject<any>
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      dataIndex: 'nickname',
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
            <div className="detail-item">生日：{item.birthday}</div>
            <div className="detail-item">身高：{item.height.value}</div>
            <div className="detail-item">体重：{item.weight.value}</div>
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
          <div style={{ cursor: "pointer" }} onClick={() => deletePeople(item)}>
            删除
          </div>
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

  const onSubmit = () => {
    form.validateFields().then((res) => {
      setLoading(true)
      const { name, cycle, desc } = res
      const params = {
        name,
        desc,
        startTime: dayjs(cycle[0]).format("YYYY-MM-DD"),
        endTime: dayjs(cycle[1]).format("YYYY-MM-DD"),
        peopleIds: selectCurrentPeople.map(item => item.id)
      }
      apiPostProjectCreate(params).then(() => {
        message.success("创建成功")
        navigate("/project/list")
      }).finally(() => {
        setLoading(false)
      })
    })
  }

  return (
    <div className='create'>
      <Form style={{ width: '400px' }} form={form}>
        <Form.Item name="name" label="项目名称" rules={[
          {
            required: true,
            message: '请选择项目名称',
          },
        ]}>
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item name="desc" label="项目简介" rules={[
          {
            required: true,
            message: '请选择项目名称',
          },
        ]}>
          <Input.TextArea placeholder="请输入项目简介" />
        </Form.Item>
        <Form.Item name="cycle" label="项目周期" rules={[
          {
            required: true,
            message: '请选择项目周期',
          },
        ]}>
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
        <Button type="primary" loading={loading} onClick={onSubmit}>提交</Button>
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
