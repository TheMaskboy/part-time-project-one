import { useState } from 'react'
import './style.scss'
import type { PeopleDetailType } from '../../../type/people'
import { PeopleDetail } from '../../../mock/people'
import { Descriptions } from 'antd'

const UserDetail = () => {
  const [detail] = useState<PeopleDetailType>(PeopleDetail)
  return (
    <div>
      <Descriptions title="用户详情">
        <Descriptions.Item label="用户昵称">{detail.nickname}</Descriptions.Item>
        <Descriptions.Item label="用户生日">
          {detail.birthday}
        </Descriptions.Item>
        <Descriptions.Item label="用户身高">{detail.height.value}</Descriptions.Item>
        <Descriptions.Item label="用户体重">{detail.weight.value}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default UserDetail
