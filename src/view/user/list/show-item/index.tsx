import { Switch } from "antd"
import type { CustomType } from "../../../../type/people"
import { useEffect, useState } from "react"
import "./style.scss"

const ShowItem = ({ detail, onChangeValue }: { detail: CustomType, onChangeValue: (id: number, show: number) => void }) => {

    const [isPublic, setIsPublic] = useState(false)

    useEffect(() => {
        setIsPublic(detail.show === 1)
    }, [detail])

    const onChange = () => {
        onChangeValue(Number(detail.id), detail.show === 1 ? 0 : 1)
    }

    return <div className="custom-item">
        {detail.name}
        <Switch checkedChildren="展示" unCheckedChildren="隐藏" value={isPublic} onChange={onChange} />
    </div>
}

export default ShowItem