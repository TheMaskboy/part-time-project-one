import { Button, message, Modal, Spin, Table, type TableProps } from 'antd'
import type { PeopleItem } from '../../type/people'
import ShowItem from '../../view/user/list/show-item'
import { useEffect, useRef, useState } from 'react'
import { apiPostUpdatePropertyShow } from '../../api/user'
import { apiGetPeopleOfProject, apiPostAddPeopleOfProject, apiPostDeletePeopleOfProject } from '../../api/project'
import { useNavigate, useParams } from 'react-router-dom'
import PeopleAdd from '../people/add'
import { ProjuctStatus } from '../../enum/project'
import type { ProjectItem } from '../../type/project'

const UserTable = ({ detail }: { detail: ProjectItem }) => {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<PeopleItem[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isShowModal, setIsShowModal] = useState(false)
  const [peopleIds, setPeopleIds] = useState<number[]>([])
  const navigate = useNavigate()
  const id = useParams()?.id
  const childRef = useRef({}) as React.MutableRefObject<any>
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getList()
  }, [id, pageNumber, pageSize])

  const getList = () => {
    setLoading(true)
    apiGetPeopleOfProject({ projectId: Number(id), current: pageNumber, size: pageSize }).then(res => {
      setList(res.records)
      setTotal(res.total)
    }).finally(() => {
      setLoading(false)
    })
  }

  const deletePeople = (item: PeopleItem) => {
    if (!id) return
    Modal.confirm({
      title: '提示',
      content: '确认要删除该用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        apiPostDeletePeopleOfProject({ id: Number(id), peopleIds: [item.id] }).then(() => {
          message.success("删除成功")
          getList()
        })
      },
    })
  }

  const onClickSubmit = () => {
    navigate('/user/create')
  }
  const onClickAddPeople = () => {
    setLoading(true)
    if (!id) return
    apiPostAddPeopleOfProject({ id: Number(id), peopleIds }).then(() => {
      setIsShowModal(false)
      message.success("添加成功")
      getList()
    }).catch(() => {
      setLoading(false)
    })
  }

  const updatePeopleIds = (value: number[]) => {
    setPeopleIds(value)
  }

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
      title: '生日',
      dataIndex: 'birthday',
      key: '3',
      width: 100,
      align: 'center',
    },
    {
      title: '基本信息',
      dataIndex: 'detail',
      key: '4',
      width: 300,
      align: 'center',
      render: (_, item: PeopleItem) => {
        return (
          <div className="detail">
            {
              !!item.height && <div className="detail-item">
                <ShowItem onChangeValue={onChangeValue} detail={item.height} />
              </div>
            }
            {
              !!item.weight && <div className="detail-item">
                <ShowItem onChangeValue={onChangeValue} detail={item.weight} />
              </div>
            }

            {
              !!item.image && <div className="detail-item">
                <ShowItem onChangeValue={onChangeValue} detail={item.image} />
              </div>
            }
            {
              !!item.propertyVos && item.propertyVos.length > 0 && item.propertyVos.map(item => {
                return <div key={item.name} className="detail-item">
                  <ShowItem onChangeValue={onChangeValue} detail={item} />
                </div>
              })
            }
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

  const onChangeValue = (id: number, show: number) => {
    setLoading(true)
    apiPostUpdatePropertyShow({ propertyId: id, show }).then(() => {
      message.success("修改成功")
      getList()
    }).catch(() => {
      setLoading(false)
    })
  }

  const onChangePage = (e: number) => {
    setPageNumber(e)
  }

  const onShowSizeChange = (current: number, size: number) => {
    setPageNumber(current)
    setPageSize(size)
  }

  return (
    <div>
      <div className="people-num">
        <div className="label"><span>参与人员</span>：共计{total}人
        </div>
        {detail.status !== ProjuctStatus.END && (
          <Button type="primary" onClick={() => setIsShowModal(true)}>
            添加人员
          </Button>
        )}
      </div>
      <Spin spinning={loading}>
        <Table<PeopleItem>
          columns={columns}
          rowKey="id"
          dataSource={list}
          bordered
          pagination={{
            total, hideOnSinglePage: true, onChange: onChangePage,
            pageSize: pageSize, current: pageNumber, showSizeChanger: true, showQuickJumper: true, onShowSizeChange
          }}
        />
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
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <Button type="primary" onClick={onClickSubmit}>
              新增人员
            </Button>
            <Button type="primary" loading={loading} onClick={onClickAddPeople}>
              确认添加
            </Button>
            <Button onClick={() => setIsShowModal(false)}>取消</Button>
          </div>
        }
      >
        <PeopleAdd
          projectId={Number(id)}
          ref={childRef}
          updatePeopleIds={updatePeopleIds}
        />
      </Modal>
    </div>
  )
}

export default UserTable
