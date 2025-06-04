import { useEffect, useState } from 'react'
import './style.scss'
import { Descriptions } from 'antd'
import { apiGetUserDetail } from '../../../api/user'
import { useParams } from 'react-router-dom'
import type { PeopleItem } from '../../../type/people'

const UserDetail = () => {
  const id = useParams().id
  const [detail, setDetail] = useState<PeopleItem>()

  useEffect(() => {
    apiGetUserDetail(Number(id)).then(res => {
      setDetail(res)
    })
  }, [id])

  return (
    <>
      {
        !!detail && <div>
          <Descriptions title="用户详情">
            <Descriptions.Item label="用户昵称">{detail.nickname}</Descriptions.Item>
            <Descriptions.Item label="用户生日">
              {detail.birthday}
            </Descriptions.Item>
            <Descriptions.Item label="用户身高">{detail.height.value}</Descriptions.Item>
            <Descriptions.Item label="用户体重">{detail.weight.value}</Descriptions.Item>
            {
              !!detail.propertyVos && detail.propertyVos.map(item => {
                return <Descriptions.Item key={item.name} label={item.name}>{item.value}</Descriptions.Item>
              })
            }
          </Descriptions>
        </div>
      }
    </>
  )
}

export default UserDetail
