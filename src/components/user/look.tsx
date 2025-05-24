import { Table, type TableProps } from 'antd'
import type { PeopleLookCount } from '../../type/people'

const UserLook = ({ list }: { list: PeopleLookCount[] }) => {
  const columns: TableProps<PeopleLookCount>['columns'] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '1',
      width: 100,
      align: 'center',
    },
    {
      title: '微信昵称',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center',
    },
    {
      title: '微信号/手机号',
      dataIndex: 'phone',
      key: '3',
      width: 100,
      align: 'center',
    },
  ]

  return (
    <div>
      <Table<PeopleLookCount>
        columns={columns}
        rowKey="id"
        dataSource={list}
        bordered
      />
    </div>
  )
}

export default UserLook
