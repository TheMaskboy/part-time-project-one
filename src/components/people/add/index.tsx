import { Button, Input, Table, type TableProps } from 'antd'
import { useState } from 'react'
import './style.scss'
import type { PeopleItem } from '../../../type/people'
import { PeopleList } from '../../../mock/people'

const PeopleAdd = () => {
  const [searchValue, setSearchValue] = useState('')

  const [selectId, setSelectId] = useState<number[]>([])

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
      key: '1',
      width: 100,
    },
  ]

  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')

  const rowSelection: TableProps<PeopleItem>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: PeopleItem[]) => {
      setSelectId(selectedRows.map((item) => item.id))
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
          ...rowSelection,
        }}
        columns={columns}
        rowKey="id"
        dataSource={PeopleList}
      />
    </div>
  )
}

export default PeopleAdd
