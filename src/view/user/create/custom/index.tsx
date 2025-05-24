import { Input } from 'antd'

const Custom = ({
  custom,
  customList,
  updateCustomList,
}: {
  custom: string[]
  customList: string[][]
  updateCustomList: (value: string[][]) => void
}) => {
  const changeValue = (e: string) => {
    const index = customList.findIndex((item) => item === custom) || 0
    customList[index][1] = e
    updateCustomList([...customList])
  }

  return (
    <div>
      <Input onChange={(e) => changeValue(e.target.value)} />
    </div>
  )
}

export default Custom
