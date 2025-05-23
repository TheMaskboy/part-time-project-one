import { Button, Input, Table, type TableProps } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './style.scss'
import type { PeopleItem } from '../../../type/people'
import { PeopleList } from '../../../mock/people'

const PeopleAdd = forwardRef(
  (
    {
      selectPeoples,
      list,
    }: { list?: PeopleItem[]; selectPeoples: (value: PeopleItem[]) => void },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('')

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const columns: TableProps<PeopleItem>['columns'] = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: '1',
        width: 100,
      },
      {
        title: '用户名称',
        dataIndex: 'name',
        key: '2',
        width: 100,
      },
    ]

    useEffect(() => {
      if (!list) return
      setSelectedRowKeys(list.map((item) => item.id))
    }, [list])

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
        name: record.name,
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
          dataSource={PeopleList}
        />
      </div>
    )
  }
)

export default PeopleAdd
