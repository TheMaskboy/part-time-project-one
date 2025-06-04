import { Input, Switch } from 'antd'
import type { CustomType } from '../../../../type/people'
import { useEffect, useState } from 'react'
import "./index.scss"

const Custom = ({
  custom,
  customList,
  updateCustomList,
}: {
  custom: CustomType
  customList: CustomType[]
  updateCustomList: (value: CustomType) => void
}) => {

  const [isPublicValue, setIsPublic] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const index = customList.findIndex((item) => item.name === custom?.name) || 0
    if (index >= 0) {
      setInputValue(customList[index].value)
      setIsPublic(customList[index]?.show === 1)
    }
    console.log(customList)
  }, [])

  useEffect(() => {
    const obj = {
      name: custom?.name,
      value: inputValue,
      show: !!isPublicValue ? 1 : 0
    }
    updateCustomList && updateCustomList(obj)
  }, [inputValue, isPublicValue])

  return (
    <div className='custom-wrap'>
      <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder={`请输入${custom?.name}`} />
      <Switch checkedChildren="开" unCheckedChildren="关" value={isPublicValue} onChange={(e) => setIsPublic(e)} />
    </div>
  )
}

export default Custom
