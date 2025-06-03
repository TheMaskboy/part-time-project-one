import { Switch } from "antd"
import type { CustomType } from "../../../../type/people"
import { useEffect, useState } from "react"
import "./style.scss"

const ShowItem = ({ detail }: { detail: CustomType }) => {

    const [isPublic, setIsPublic] = useState(false)

    useEffect(()=>{
        setIsPublic(detail.show === 1)
    },[detail])

    return <div className="custom-item">
        {detail.name}
        <Switch checkedChildren="展示" unCheckedChildren="隐藏" value={isPublic} onChange={(e) => setIsPublic(e)} />
    </div>
}

export default ShowItem