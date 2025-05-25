import { Button, Input, Modal, Table, type TableProps } from 'antd'
import { useState } from 'react'
import type { PeopleItem } from '../../../type/people'
import './style.scss'
import { PeopleList } from '../../../mock/people'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const [list, setList] = useState<PeopleItem[]>(PeopleList)
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
          <div className="btns-wrap">
            <Button onClick={() => navigate(`/user/detail/1`)}>详情</Button>
            <Button>修改</Button>
            <Button onClick={() => deletePeople(item)}>删除</Button>
          </div>
        )
      },
    },
  ]

  const deletePeople = (detail: PeopleItem) => {
    Modal.confirm({
      title: '提示',
      content: '确认要删除该用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const index = list.findIndex((item) => item.id === detail.id)
        list.splice(index, 1)
        setList([...list])
      },
    })
  }

  return (
    <div className="table">
      <div className="wrap">
        <div className="inner">
          <span>用户ID/昵称：</span>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width={200}
            placeholder="请输入项目名称"
          />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </div>
        <Button onClick={() => navigate(`/user/create`)} type="primary">
          新增人员
        </Button>
      </div>
      <Table<PeopleItem> columns={columns} dataSource={list} bordered />
    </div>
  )
}

export default UserList
