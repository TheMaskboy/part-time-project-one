import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import ImageUpload from '../../../../components/uploadImage'

type ItemType = {
  value: {
    imgUrl?: string
    file?: File | undefined
  }[]
  isPublic?: number
}

interface PropsType {
  value?: ItemType
  onChange?: (value: any) => void
}

const UserImage = ({ value, onChange }: PropsType) => {
  const [isPublicValue, setIsPublic] = useState(false)

  useEffect(() => {
    onChange &&
      onChange({
        isPublic: !!isPublicValue ? 1 : 0,
      })
  }, [isPublicValue])

  return (
    <div>
      <Switch
        style={{ marginTop: '6px' }}
        checkedChildren="开"
        unCheckedChildren="关"
        value={isPublicValue}
        onChange={(e) => setIsPublic(e)}
      />
      <div style={{ marginTop: '20px' }}>
        <ImageUpload value={value?.value} onChange={onChange} />
      </div>
    </div>
  )
}

export default UserImage
