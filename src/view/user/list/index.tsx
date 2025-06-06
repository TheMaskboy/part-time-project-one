import { Button, Input, message, Modal, Spin, Table, type TableProps } from 'antd'
import { useEffect, useState } from 'react'
import type { PeopleItem } from '../../../type/people'
import './style.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import ShowItem from './show-item'
import { apiPostDeleteUser, apiPostUpdatePropertyShow, getUserList } from '../../../api/user'
import { queryUrl } from '../../../utils/function'

const UserList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchId, setSearchId] = useState('')
  const navigate = useNavigate()
  const [list, setList] = useState<PeopleItem[]>([])
  const pageNumber = new URLSearchParams(useLocation().search).get("pageNumber") || 1
  const pageSize = new URLSearchParams(useLocation().search).get("pageSize") || 10
  const nickname = new URLSearchParams(useLocation().search).get("nickname") || ""
  const id = new URLSearchParams(useLocation().search).get("id") || ""
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
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
          <div className="btns-wrap">
            <div onClick={() => { navigate(`/user/detail/${item.id}`); window.location.reload() }}>详情</div>
            <div onClick={() => navigate(`/user/update/${item.id}`)}>修改</div>
            <div onClick={() => deletePeople(item)}>删除</div>
          </div>
        )
      },
    },
  ]

  const onChangeValue = (id: number, show: number) => {
    setLoading(true)
    apiPostUpdatePropertyShow({ propertyId: id, show }).then(() => {
      message.success("修改成功")
      getUserListMth()
    }).catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getUserListMth()
    setSearchId(id)
    setSearchValue(nickname)
  }, [pageNumber, nickname, id, pageSize])

  const getUserListMth = () => {
    setLoading(true)
    getUserList({
      current: Number(pageNumber),
      size: Number(pageSize),
      id: searchId || id,
      nickname: searchValue || nickname
    }).then(res => {
      setList(res.records)
      setTotal(res.total)
    }).finally(() => {
      setLoading(false)
    })
  }

  const deletePeople = (detail: PeopleItem) => {
    Modal.confirm({
      title: '提示',
      content: '确认要删除该用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        apiPostDeleteUser(detail.id).then(() => {
          message.success("删除成功")
          getUserListMth()
        })
      },
    })
  }

  const onSubmit = () => {
    const query = queryUrl({ nickname: searchValue, id: searchId })
    navigate(`?${query}`)
  }

  const reset = () => {
    setSearchId("")
    setSearchValue("")
    navigate(`/user/list`)
  }

  const onChangePage = (e: number) => {
    const query = queryUrl({ pageNumber: e })
    navigate(`?${query}`)
  }

  const onShowSizeChange = (current: number, size: number) => {
    const query = queryUrl({ pageNumber: current, pageSize: size })
    navigate(`?${query}`)
  }

  return (
    <div className="table">
      <div className="wrap">
        <div className="inner">
          <span>用户ID/昵称：</span>
          <Input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            width={200}
            placeholder="请输入用户ID"
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width={200}
            placeholder="请输入用户昵称"
          />
          <Button type="primary" onClick={onSubmit}>查询</Button>
          <Button onClick={reset}>重置</Button>
        </div>
        <Button onClick={() => navigate(`/user/create`)} type="primary">
          新增人员
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table<PeopleItem> columns={columns} dataSource={list} bordered pagination={{ total, showQuickJumper: true, hideOnSinglePage: true, onChange: onChangePage, pageSize: Number(pageSize), current: Number(pageNumber), showSizeChanger: true, onShowSizeChange }} />
      </Spin>
    </div>
  )
}

export default UserList
