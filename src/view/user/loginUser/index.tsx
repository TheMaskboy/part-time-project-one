import { Button, Input, Modal, Table, type TableProps } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { LoginPeopleItem, PeopleItem } from "../../../type/people"
import { PeopleList } from "../../../mock/people"

const LoginUser = () => {

    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const [list, setList] = useState<LoginPeopleItem[]>(PeopleList)

    const deletePeople = (detail: LoginPeopleItem) => {
        Modal.confirm({
            title: '提示',
            content: '确认要删除该用户吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                const index = list.findIndex((item) => item.id === detail.id)
                list.splice(index, 1)
                setList([...list])
            },
        })
    }

    const columns: TableProps<LoginPeopleItem>['columns'] = [
        {
            title: '用户ID',
            dataIndex: 'id',
            key: '1',
            width: 100,
            align: 'center',
        },
        {
            title: '用户名称',
            dataIndex: 'nickname',
            key: '2',
            width: 100,
            align: 'center',
        },
        {
            title: '用户手机号',
            dataIndex: 'birthday',
            key: '3',
            width: 100,
            align: 'center',
        },
        {
            title: '最后一次访问时间',
            dataIndex: 'birthday',
            key: '4',
            width: 100,
            align: 'center',
        },
    ]

    return <div className="table">
        <div className="wrap">
            <div className="inner">
                <span>用户昵称/手机号：</span>
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    width={200}
                    placeholder="请输入用户昵称/手机号"
                />
                <Button type="primary">查询</Button>
                <Button>重置</Button>
            </div>
            <Button onClick={() => navigate(`/user/create`)} type="primary">
                新增人员
            </Button>
        </div>
        <Table<PeopleItem> columns={columns} dataSource={list} bordered />
    </div>
}

export default LoginUser