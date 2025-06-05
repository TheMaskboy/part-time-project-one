import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import type { ProjectItem } from '../../../type/project'
import { Button, Descriptions, message, Modal } from 'antd'
import { ProjectStatusList, ProjuctStatus } from '../../../enum/project'
import UserTable from '../../../components/user/table'
import type { PeopleItem } from '../../../type/people'
import PeopleAdd from '../../../components/people/add'
import { PeopleLookCountList } from '../../../mock/peopleLook'
import UserLook from '../../../components/user/look'
import { apiGetPeopleOfProject, apiGetProjectDetail, apiPostAddPeopleOfProject, apiPostDeletePeopleOfProject } from '../../../api/project'
import dayjs from 'dayjs'
const ProjectDetail = () => {
  const id = useParams()?.id
  const [detail, setDetail] = useState<ProjectItem>()
  const [isShowModal, setIsShowModal] = useState(false)
  const childRef = useRef({}) as React.MutableRefObject<any>
  const navigate = useNavigate()
  const [selectCurrentPeople, setSelectCurrentPeople] = useState<PeopleItem[]>([])
  const [peopleIds, setPeopleIds] = useState<number[]>([])
  const [addPeopleLoading, setAddPeopleLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    getDetail()
  }, [id])

  const getDetail = () => {
    apiGetProjectDetail(Number(id)).then((res) => {
      setDetail(res)
    })
    apiGetPeopleOfProject({ projectId: Number(id), current: 1, size: 10 }).then(res => {
      setSelectCurrentPeople(res.records)
    })
  }

  const deletePeople = (item: PeopleItem) => {
    if (!detail) return
    Modal.confirm({
      title: '提示',
      content: '确认要删除该用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        apiPostDeletePeopleOfProject({ id: detail?.id, peopleIds: [item.id] }).then(() => {
          message.success("删除成功")
          getDetail()
        })
      },
    })
  }

  const onClickSubmit = () => {
    navigate('/user/create')
  }
  const onClickAddPeople = () => {
    setAddPeopleLoading(true)
    if (!detail) return
    apiPostAddPeopleOfProject({ id: detail.id, peopleIds }).then(() => {
      setIsShowModal(false)
      message.success("添加成功")
      getDetail()
    }).finally(() => {
      setAddPeopleLoading(false)
    })
  }

  const updatePeopleIds = (value: number[]) => {
    setPeopleIds(value)
  }
  return (
    <>
      {!!detail && (
        <div>
          <Descriptions title="项目详情">
            <Descriptions.Item label="项目名称">
              {detail.name}
            </Descriptions.Item>
            <Descriptions.Item label="项目状态">
              {
                ProjectStatusList.find((item) => item.type === detail.status)
                  ?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="项目描述">
              {detail.desc}
            </Descriptions.Item>
            <Descriptions.Item label="项目周期">
              {dayjs(detail.startTime).format('YYYY-MM-DD')} -{' '}
              {dayjs(detail.endTime).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(detail.createAt).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              {detail.createName}
            </Descriptions.Item>
          </Descriptions>
          <div className="people-num">
            参与人员：共计{selectCurrentPeople.length}人
            {detail.status !== ProjuctStatus.END && (
              <Button type="primary" onClick={() => setIsShowModal(true)}>
                添加人员
              </Button>
            )}
          </div>

          <UserTable list={selectCurrentPeople} deletePeople={deletePeople} />
          <div className="people-num">浏览次数：23次 用户10人</div>
          <UserLook list={PeopleLookCountList} />
          <Modal
            title="添加人员"
            width={800}
            open={isShowModal}
            centered
            destroyOnHidden
            onCancel={() => setIsShowModal(false)}
            footer={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >
                <Button type="primary" onClick={onClickSubmit}>
                  新增人员
                </Button>
                <Button type="primary" loading={addPeopleLoading} onClick={onClickAddPeople}>
                  确认添加
                </Button>
                <Button onClick={() => setIsShowModal(false)}>取消</Button>
              </div>
            }
          >
            <PeopleAdd
              projectId={detail.id}
              ref={childRef}
              updatePeopleIds={updatePeopleIds}
            />
          </Modal>
        </div>
      )}
    </>
  )
}

export default ProjectDetail
