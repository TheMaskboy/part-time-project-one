import { Button, Input, Table, type TableProps } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './style.scss'
import type { PeopleItem } from '../../../type/people'
import { getUserList } from '../../../api/user'

const PeopleAdd = forwardRef(
  (
    {
      selectPeoples,
      peopleIds
    }: { selectPeoples: (value: PeopleItem[]) => void, peopleIds?: number[] },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchId, setSearchId] = useState('')

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const [peopleList, setPeopleList] = useState<PeopleItem[]>()
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
      getUserList({ current: pageNumber, size: 5, id: searchId, nickname: searchValue }).then().then(res => {
        setPeopleList(res.records)
      })
    }, [])

    const columns: TableProps<PeopleItem>['columns'] = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: '1',
        width: 100,
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        key: '2',
        width: 100,
      },
    ]

    useEffect(() => {
      if (!peopleIds || peopleIds.length === 0) return
      console.log(peopleIds)
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
      onChange: (_, selectedRows: PeopleItem[]) => {
        setSelectedRowKeys(selectedRows.map((item) => item.id))
        selectPeoples(selectedRows)
      },
      getCheckboxProps: (record: PeopleItem) => ({
        name: record.nickname,
      }),
    }

    return (
      <div className="people-modal">
        <div className="top">
          <span>用户名称：</span>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width={200}
            placeholder="请输入用户名称/ID"
          />
          <Button type="primary">查找</Button>
          <Button>重置</Button>
        </div>
        <Table<PeopleItem>
          rowSelection={{
            type: selectionType,
            selectedRowKeys,
            ...rowSelection,
          }}
          columns={columns}
          rowKey="id"
          dataSource={peopleList}
        />
      </div>
    )
  }
)

export default PeopleAdd
