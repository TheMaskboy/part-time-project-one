import { Input, Switch } from "antd"
import { useEffect, useState } from "react"
import "./style.scss"

type ItemType = {
    value: string,
    isPublic: number
}

interface PropsType {
    value?: ItemType,
    onChange?: (value: ItemType) => void,
    name: string
}

const PeopleEidtItem = ({ value, onChange, name }: PropsType) => {
    const [inputValue, setInputValue] = useState("")
    const [isPublicValue, setIsPublic] = useState(false)

    useEffect(() => {
        if (!!value?.value) {
            setInputValue(value.value)
        }

        setIsPublic(value?.isPublic === 1)

    }, [value])

    useEffect(() => {
        onChange && onChange({
            value: inputValue,
            isPublic: !!isPublicValue ? 1 : 0
        })
    }, [inputValue, isPublicValue])

    return <div className="item">
        <Input placeholder={`请输入${name}`} onChange={e => setInputValue(e.target.value)} value={inputValue} />
        <Switch checkedChildren="开" unCheckedChildren="关" value={isPublicValue} onChange={(e) => setIsPublic(e)} />
    </div>
}

export default PeopleEidtItem