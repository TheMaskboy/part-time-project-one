import { Button, Input, Modal, Table, type TableProps } from 'antd'
import type { ProjectItem } from '../../../type/project'
import { ProjectLists } from '../../../mock/project'
import { ProjectStatusList } from '../../../enum/project'
import './style.scss'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PeopleAdd from '../../../components/people/add'
import type { PeopleItem } from '../../../type/people'

const ProjectList = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const columns: TableProps<ProjectItem>['columns'] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '1',
      width: 50,
      align: 'center',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: '2',
      align: 'center',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: '3',
      width: 100,
      render: (text) => (
        <a>{ProjectStatusList.find((item) => item.type === text)?.name}</a>
      ),
    },
    {
      title: '参与人数',
      dataIndex: 'peopleNum',
      key: '4',
      width: 100,
      align: 'center',
    },
    {
      title: '项目描述',
      dataIndex: 'desc',
      key: '5',
      width: 100,
      align: 'center',
    },
    {
      title: '浏览次数',
      dataIndex: 'lookCount',
      key: '6',
      align: 'center',
      width: 100,
    },
    {
      title: '项目周期',
      dataIndex: '',
      key: '7',
      width: 100,
      align: 'center',
      render: (_, detail: ProjectItem) => (
        <div>{detail.startTime} - {detail.endTime}</div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: '8',
      width: 100,
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'createName',
      key: '9',
      width: 100,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: '10',
      width: 150,
      align: 'center',
      render: (_) => {
        return (
          <div className="operate">
            <span onClick={() => window.open(`/project/detail/1`)}>详情</span>
            <span onClick={() => setIsShowModal(true)}>人员增加</span>
            <span>开始</span>
          </div>
        )
      },
    },
  ]

  const [isShowModal, setIsShowModal] = useState(false)

  const onClickSubmit = () => {
    navigate(`/user/create`)
  }

  const [selectPeople, setSelectPeople] = useState<PeopleItem[]>([])
  const [_, setSelectCurrentPeople] = useState<PeopleItem[]>([])
  const selectPeoples = (value: PeopleItem[]) => {
    setSelectPeople(value)
  }
  const childRef = useRef({}) as React.MutableRefObject<any>

  const onClickAddPeople = () => {
    setIsShowModal(false)
    setSelectCurrentPeople(selectPeople)
  }

  return (
    <div className="table">
      <div className="wrap">
        <div className="inner">
          <span>项目名称：</span>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width={200}
            placeholder="请输入项目名称"
          />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </div>
        <Button type="primary" onClick={() => navigate('/project/create')}>
          新建项目
        </Button>
      </div>
      <Table<ProjectItem> columns={columns} dataSource={ProjectLists} />

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

export default ProjectList
