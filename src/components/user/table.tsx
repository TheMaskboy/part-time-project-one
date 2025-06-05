import { Table, type TableProps } from 'antd'
import type { PeopleItem } from '../../type/people'

const UserTable = ({
  list,
  deletePeople,
}: {
  list: PeopleItem[]
  deletePeople: (value: PeopleItem) => void
}) => {
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
      title: '基本信息',
      dataIndex: 'detail',
      key: '3',
      width: 300,
      align: 'center',
      render: (_, item: PeopleItem) => {
        return (
          <div className="detail">
            <div className="detail-item">生日：{item.birthday}</div>
            {
              !!item.height.show && <div className="detail-item">身高：{item.height.value}</div>
            }
            {
              !!item.weight.show && <div className="detail-item">体重：{item.weight.value}</div>
            }
            {
              item.propertyVos.map(detail => {
                return <>
                  {
                    detail.show && <div key={item.id} className="detail-item">{detail.name}：{detail.value}</div>
                  }
                </>
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
          <div style={{cursor:"pointer"}} onClick={() => deletePeople(item)}>
            删除
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <Table<PeopleItem>
        columns={columns}
        rowKey="id"
        dataSource={list}
        bordered
      />
    </div>
  )
}

export default UserTable
