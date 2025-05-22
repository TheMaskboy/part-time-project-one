import { Button, Input, Table, type TableProps } from 'antd'
import type { ProjectItem } from '../../../type/project'
import { ProjectLists } from '../../../mock/project'
import { ProjectStatusList } from '../../../enum/project'
import './style.scss'
import { useState } from 'react'

const ProjectList = () => {
  const [searchValue, setSearchValue] = useState('')
  const columns: TableProps<ProjectItem>['columns'] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '1',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: '2',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '3',
      width: 100,
      render: (text) => (
        <a>{ProjectStatusList.find((item) => item.type === text)?.name}</a>
      ),
    },
    {
      title: '参与人数',
      dataIndex: 'people',
      key: '4',
      width: 100,
    },
    {
      title: '项目描述',
      dataIndex: 'description',
      key: '5',
      width: 200,
    },
    {
      title: '浏览次数',
      dataIndex: 'lookCount',
      key: '6',
      width: 100,
    },
    {
      title: '项目周期',
      dataIndex: 'cycle',
      key: '7',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: '8',
      width: 100,
    },
  ]

  return (
    <div className="table">
      <div className="wrap">
        <span>项目名称：</span>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          width={200}
          placeholder="请输入项目名称"
        />
        <Button type="primary">查询</Button>
        <Button>重置</Button>
      </div>
      <Table<ProjectItem> columns={columns} dataSource={ProjectLists} />
    </div>
  )
}

export default ProjectList
