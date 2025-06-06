import { useParams } from 'react-router-dom'
import './style.scss'
import { useEffect, useState } from 'react'
import type { ProjectItem } from '../../../type/project'
import { Descriptions } from 'antd'
import { ProjectStatusList } from '../../../enum/project'
import UserTable from '../../../components/user/table'
import UserLook from '../../../components/user/look'
import { apiGetProjectDetail } from '../../../api/project'
import dayjs from 'dayjs'
const ProjectDetail = () => {
  const id = useParams()?.id
  const [detail, setDetail] = useState<ProjectItem>()

  useEffect(() => {
    if (!id) return
    getDetail()
  }, [id])

  const getDetail = () => {
    apiGetProjectDetail(Number(id)).then((res) => {
      setDetail(res)
    })
  }
  return (
    <>
      {!!detail && (
        <div>
          <Descriptions title="项目详情">
            <Descriptions.Item label="项目名称">
              {detail.name}
            </Descriptions.Item>
            <Descriptions.Item label="项目状态">
              {
                ProjectStatusList.find((item) => item.type === detail.status)
                  ?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="项目描述">
              {detail.desc}
            </Descriptions.Item>
            <Descriptions.Item label="项目周期">
              {dayjs(detail.startTime).format('YYYY-MM-DD')} -{' '}
              {dayjs(detail.endTime).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(detail.createAt).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              {detail.createName}
            </Descriptions.Item>
          </Descriptions>
          <UserTable detail={detail} />
          <UserLook />
        </div>
      )}
    </>
  )
}

export default ProjectDetail
