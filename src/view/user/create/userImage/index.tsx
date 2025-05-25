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
    const newObj = Object.assign(value || {}, {
      isPublic: !!isPublicValue ? 1 : 0,
    })
    onChange && onChange(newObj)
  }, [isPublicValue])

  const onChangeValue = (detail: any) => {
    const newObj = Object.assign(value || {}, { value: detail })
    onChange && onChange(newObj)
  }

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
        <ImageUpload value={value?.value} onChange={onChangeValue} />
      </div>
    </div>
  )
}

export default UserImage
