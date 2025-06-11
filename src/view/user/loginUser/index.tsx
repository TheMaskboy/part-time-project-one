import { Button, Input, Spin, Table, type TableProps } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { LoginUserListItem, } from "../../../type/people"
import { apiGetLoginUserList } from "../../../api/user"
import { queryUrl } from "../../../utils/function"
import dayjs from "dayjs"

const LoginUser = () => {

    const [searchValue, setSearchValue] = useState('')
    const [searchPhone, setSearchPhone] = useState('')
    const [list, setList] = useState<LoginUserListItem[]>([])
    const nickname = new URLSearchParams(useLocation().search).get("nickname") || ""
    const phone = new URLSearchParams(useLocation().search).get("phone") || ""
    const pageNumber = new URLSearchParams(useLocation().search).get("pageNumber") || "1"
    const pageSize = new URLSearchParams(useLocation().search).get("pageSize") || "10"
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchValue(nickname)
        setSearchPhone(phone)
        getLoginUserList()
    }, [phone, nickname, pageNumber, pageSize])

    const getLoginUserList = () => {
        setLoading(true)
        apiGetLoginUserList({
            nickname: searchValue || nickname,
            phone: searchPhone || phone,
            size: Number(pageSize),
            current: Number(pageNumber)
        }).then(res => {
            setTotal(res.total)
            setList(res.records)
        }).finally(() => {
            setLoading(false)
        })
    }

    const columns: TableProps<LoginUserListItem>['columns'] = [
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
            dataIndex: 'phone',
            key: '3',
            width: 100,
            align: 'center',
        },
        {
            title: '最后一次访问时间',
            dataIndex: 'lastLoginTime',
            key: '4',
            width: 100,
            align: 'center',
            render: (_, detail: LoginUserListItem) => {
                return <div>{dayjs(detail.lastLoginTime).format('YYYY-MM-DD')}</div>
            }
        },
    ]

    const onSubmit = () => {
        const query = queryUrl({
            nickname: searchValue,
            phone: searchPhone
        })
        navigate(`?${query}`)
    }

    const reset = () => {
        setSearchPhone("")
        setSearchValue("")
        navigate(`/loginUser/list`)
    }

    const onChangePage = (e: number) => {
        const query = queryUrl({ pageNumber: e })
        navigate(`?${query}`)
    }

    const onShowSizeChange = (current: number, size: number) => {
        const query = queryUrl({ pageNumber: current, pageSize: size })
        navigate(`?${query}`)
    }

    return <div className="table">
        <div className="wrap">
            <div className="inner">
                <span>用户昵称/手机号：</span>
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    width={200}
                    placeholder="请输入用户昵称"
                />
                <Input
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    width={200}
                    placeholder="请输入用户手机号"
                />
                <Button type="primary" onClick={onSubmit} loading={loading}>查询</Button>
                <Button onClick={reset} loading={loading}>重置</Button>
            </div>
        </div>
        <Spin spinning={loading}>
            <Table<LoginUserListItem> rowKey="id" columns={columns} dataSource={list} bordered pagination={{ total, showQuickJumper: true, hideOnSinglePage: true, onChange: onChangePage, pageSize: Number(pageSize), current: Number(pageNumber), showSizeChanger: true, onShowSizeChange }} />
        </Spin>
    </div>
}

export default LoginUser