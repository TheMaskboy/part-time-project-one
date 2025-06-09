import { Button, Input, Spin, Table, type TableProps } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './style.scss'
import type { PeopleItem } from '../../../type/people'
import { getProjectUserList, getUserList } from '../../../api/user'

const PeopleAdd = forwardRef(
  (
    {
      projectId,
      updatePeopleIds,
      peopleIds,
    }: { updatePeopleIds: (value: number[], row?: PeopleItem[]) => void; peopleIds?: number[], projectId?: number },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchId, setSearchId] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [_, setSelectedRows] = useState<PeopleItem[]>([])
    const [peopleList, setPeopleList] = useState<PeopleItem[]>()
    const [pageNumber, setPageNumber] = useState(1)
    const [total, setTotal] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const paramsInit = {
      size: 10,
      current: 1,
      id: "",
      nickname: "",
      projectId
    }

    useEffect(() => {
      getUserListMth()
    }, [pageNumber, pageSize, projectId])

    const getUserListMth = (init?: boolean) => {
      setLoading(true)
      console.log(projectId)
      const func = !!projectId ? getProjectUserList : getUserList
      func(init ? paramsInit : {
        current: pageNumber,
        size: pageSize,
        id: searchId,
        nickname: searchValue,
        projectId
      })
        .then((res) => {
          setPeopleList(res.records)
          setTotal(res.total)
        }).finally(() => {
          setLoading(false)
        })
    }

    const columns: TableProps<PeopleItem>['columns'] = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: '1',
        width: 100,
        align:"center"
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        key: '2',
        width: 100,
        align:"center"
      },
    ]

    useEffect(() => {
      if (!peopleIds || peopleIds.length === 0) return
      setSelectedRowKeys(peopleIds)
    }, [peopleIds])

    const updatePeople = (value: PeopleItem[]) => {
      setSelectedRowKeys(value.map((item) => item.id))
    }

    // 向父组件暴露指定的方法
    useImperativeHandle(ref, () => ({
      updatePeople,
    }))

    const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')

    const rowSelection: TableProps<PeopleItem>['rowSelection'] = {
      onChange: (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys)
        setSelectedRows(selectedRows)
        updatePeopleIds && updatePeopleIds(selectedKeys.map(item => Number(item)), selectedRows)
      },
      getCheckboxProps: (record: PeopleItem) => ({
        id: String(record.id),
      }),
    }

    const onChangePage = (e: number) => {
      setPageNumber(e)
    }

    const onShowSizeChange = (current: number, size: number) => {
      setPageNumber(current)
      setPageSize(size)
    }

    const onSeachValue = () => {
      setLoading(true)
      getUserListMth()
    }

    const reset = () => {
      setSearchValue("")
      setSearchId("")
      setPageNumber(1)
      setPageSize(10)
      getUserListMth(true)
    }

    return (
      <div className="people-modal">
        <div className="top">
          <span>用户名称：</span>
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
            placeholder="请输入用户名称"
          />
          <Button type="primary" loading={loading} onClick={onSeachValue}>查找</Button>
          <Button loading={loading} onClick={reset}>重置</Button>
        </div>
        <Spin spinning={loading}>
          <Table<PeopleItem>
            rowSelection={{
              type: selectionType,
              selectedRowKeys,
              preserveSelectedRowKeys: true,
              ...rowSelection,
            }}
            bordered
            scroll={{ y: '305px' }}  // 使用视口高度计算
            columns={columns}
            rowKey="id"
            className='add-people-table'
            dataSource={peopleList}
            pagination={{ total, hideOnSinglePage: true, onChange: onChangePage, pageSize: Number(pageSize), showQuickJumper: true, current: Number(pageNumber), showSizeChanger: true, onShowSizeChange }}
          />
        </Spin>
      </div>
    )
  }
)

export default PeopleAdd
