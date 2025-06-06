import { Spin, Table, type TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetLookUserOfProject, apiGetViewCount } from '../../api/project'
import type { LookUserOfProjectItem } from '../../type/project'

const UserLook = () => {
  const [list, setList] = useState<LookUserOfProjectItem[]>([])
  const id = useParams()?.id
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [viewCont, setViewCount] = useState(0)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    apiGetLookUserOfProject({
      projectId: Number(id),
      size: pageSize,
      current: pageNumber
    }).then(res => {
      setTotal(res.total)
      setList(res.records)
    }).finally(() => {
      setLoading(false)
    })
  }, [id, pageSize, pageNumber])

  useEffect(() => {
    apiGetViewCount(Number(id)).then(res => {
      setViewCount(res)
    })
  }, [id])

  const onChangePage = (e: number) => {
    setPageNumber(e)
  }

  const onShowSizeChange = (current: number, size: number) => {
    setPageNumber(current)
    setPageSize(size)
  }

  const columns: TableProps<LookUserOfProjectItem>['columns'] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '1',
      width: 100,
      align: 'center',
    },
    {
      title: '微信昵称',
      dataIndex: 'nickname',
      key: '2',
      width: 100,
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: '3',
      width: 100,
      align: 'center',
    },
  ]

  return (
    <div>
      <div className="people-num">
        <div className="label">
          <span>浏览次数</span>：{viewCont}次 <span>用户：</span>{total}人
        </div>
      </div>
      <Spin spinning={loading}>
        <Table<LookUserOfProjectItem>
          columns={columns}
          rowKey="id"
          dataSource={list}
          bordered
          pagination={{
            total, showQuickJumper: true, hideOnSinglePage: true,
            onChange: onChangePage, pageSize: Number(pageSize), current: Number(pageNumber),
            showSizeChanger: true, onShowSizeChange
          }}
        />
      </Spin>
    </div>
  )
}

export default UserLook
