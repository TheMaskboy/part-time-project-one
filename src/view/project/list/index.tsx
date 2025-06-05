import { Button, Input, message, Modal, Spin, Table, type TableProps } from 'antd'
import type { ProjectItem, ProjectStatusNum } from '../../../type/project'
import { ProjectStatusList, ProjuctStatus } from '../../../enum/project'
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PeopleAdd from '../../../components/people/add'
import {
  apiGetPeopleOfProject,
  apiGetProjectList,
  apiGetStatusClassStatic,
  apiPostAddPeopleOfProject,
  apiPostUpdateProjectStatus,
} from '../../../api/project'
import dayjs from 'dayjs'
import { queryUrl } from '../../../utils/function'

const ProjectList = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const [projectList, setProjectList] = useState<ProjectItem[]>([])
  const pageNumber = new URLSearchParams(useLocation().search).get('pageNumber') || 1
  const pageSize = new URLSearchParams(useLocation().search).get("pageSize") || 10
  const name = new URLSearchParams(useLocation().search).get('name') || ''
  const [projectStatusNum, setProjectStatusNum] = useState<ProjectStatusNum>({
    noStart: 0,
    recruit: 0,
    end: 0,
  })
  const [loading, setLoading] = useState(false)
  const [addPeopleLoading, setAddPeopleLoading] = useState(false)
  const [currentDetail, setCurrentDetail] = useState<ProjectItem>()
  const [projectAmount, setProjectAmount] = useState(0)
  const [peopleIds, setPeopleIds] = useState<number[]>([])
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
      width: 50,
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
      width: 150,
      align: 'center',
    },
    {
      title: '浏览次数',
      dataIndex: 'loginUserNum',
      key: '6',
      align: 'center',
      width: 100,
    },
    {
      title: '项目周期',
      dataIndex: '',
      key: '7',
      width: 120,
      align: 'center',
      render: (_, detail: ProjectItem) => (
        <div>
          {dayjs(detail.startTime).format('YYYY-MM-DD')} - {dayjs(detail.endTime).format('YYYY-MM-DD')}
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: '8',
      width: 100,
      align: 'center',
      render: (_, detail: ProjectItem) => (
        <div>
          {dayjs(detail.createAt).format('YYYY-MM-DD')}
        </div>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'createName',
      key: '9',
      width: 80,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: '10',
      width: 150,
      align: 'center',
      render: (_, detail: ProjectItem) => (
        <div className="operate">
          <span onClick={() => window.open(`/project/detail/${detail.id}`)}>
            详情
          </span>
          {detail.status !== ProjuctStatus.END && (
            <span onClick={() => updatePeople(detail)}>人员增加</span>
          )}
          {detail.status === ProjuctStatus.NOSTART && (
            <span onClick={() => updateStatus(detail)}>开始</span>
          )}

          {detail.status === ProjuctStatus.STARTING && (
            <span onClick={() => updateStatus(detail)}>结束</span>
          )}
        </div>
      ),
    },
  ]

  const updateStatus = (detail: ProjectItem) => {
    let status = 1
    if (detail.status === ProjuctStatus.NOSTART) {
      status = 2
    } else if (detail.status === ProjuctStatus.STARTING) {
      status = 3
    }
    apiPostUpdateProjectStatus({ id: detail.id, status }).then(() => {
      message.success('修改成功')
      getListMth()
    })
  }

  useEffect(() => {
    getListMth()
    setSearchValue(name)
  }, [pageNumber, name, pageSize])

  const getListMth = () => {
    setLoading(true)
    apiGetProjectList({
      current: Number(pageNumber),
      size: Number(pageSize),
      name: searchValue || name,
    }).then((res) => {
      setProjectList(res.records)
      setProjectAmount(res.total)
    })
    apiGetStatusClassStatic().then((res) => {
      setProjectStatusNum(res)
    }).finally(() => {
      setLoading(false)
    })
  }

  const [isShowModal, setIsShowModal] = useState(false)

  const onClickSubmit = () => {
    navigate(`/user/create`)
  }

  const updatePeopleIds = (value: number[]) => {
    setPeopleIds(value)
  }
  const childRef = useRef({}) as React.MutableRefObject<any>

  const onClickAddPeople = () => {
    if (!currentDetail) return
    setAddPeopleLoading(true)
    apiPostAddPeopleOfProject({ id: currentDetail.id, peopleIds }).then(() => {
      setIsShowModal(false)
      getListMth()
    }).finally(() => {
      setAddPeopleLoading(false)
    })

  }

  const onSumbit = () => {
    const query = queryUrl({ name: searchValue })
    navigate(`?${query}`)
  }

  const reset = () => {
    setSearchValue("")
    navigate(`/project/list`)
  }

  const onChangePage = (e: number) => {
    const query = queryUrl({ pageNumber: e })
    navigate(`?${query}`)
  }

  const onShowSizeChange = (current: number, size: number) => {
    const query = queryUrl({ pageNumber: current, pageSize: size })
    navigate(`?${query}`)
  }

  const updatePeople = (detail: ProjectItem) => {
    setCurrentDetail(detail)
    apiGetPeopleOfProject({ projectId: detail.id, current: 1, size: 100 }).then((res) => {
      setIsShowModal(true)
    })
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
          <Button type="primary" onClick={onSumbit} loading={loading}>查询</Button>
          <Button onClick={reset} loading={loading}>重置</Button>
        </div>
        <Button type="primary" onClick={() => navigate('/project/create')}>
          新建项目
        </Button>
      </div>
      <div className="status-num">
        <div className="status-num-item">项目总数：{projectAmount}个</div>
        <div className="status-num-item">
          招募中：{projectStatusNum.recruit}个
        </div>
        <div className="status-num-item">
          未开始：{projectStatusNum.noStart}个
        </div>
        <div className="status-num-item">已结束：{projectStatusNum.end}个</div>
      </div>
      <Spin spinning={loading}>
        <Table<ProjectItem> columns={columns} dataSource={projectList} pagination={{ total: projectAmount, hideOnSinglePage: true, onChange: onChangePage, pageSize: Number(pageSize), current: Number(pageNumber), showSizeChanger: true, onShowSizeChange }} />
      </Spin>

      <Modal
        title="添加人员"
        width={800}
        open={isShowModal}
        centered
        destroyOnHidden
        onCancel={() => setIsShowModal(false)}
        footer={
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <Button type="primary" onClick={onClickSubmit}>
              新增人员
            </Button>
            <Button type="primary" loading={addPeopleLoading} onClick={onClickAddPeople}>
              确认添加
            </Button>
            <Button onClick={() => setIsShowModal(false)}>取消</Button>
          </div>
        }
      >
        <PeopleAdd
          projectId={currentDetail?.id}
          ref={childRef}
          updatePeopleIds={updatePeopleIds}
        />
      </Modal>
    </div>
  )
}

export default ProjectList
