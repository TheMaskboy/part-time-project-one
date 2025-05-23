import { DatePicker, Form, Input } from "antd"
import type { PeopleEditType } from "../../../type/people"
import PeopleEidtItem from "./item"
import UserImage from "./userImage"

const UserCreate = () => {

    interface PeopleType extends PeopleEditType {
        photo: {
            image: {
                imgUrl?: string,
                file?: Blob,
            }[]
        }
    }

    const [form] = Form.useForm<PeopleType>()

    return <div>
        <Form style={{ width: '400px' }} form={form}>
            <Form.Item label='用户昵称' name="name" required>
                <Input placeholder="请输入用户名称" />
            </Form.Item>
            <Form.Item label='用户生日' name="birthday" required>
                <DatePicker placeholder="请选择生日" />
            </Form.Item>
            <Form.Item label='用户身高' rules={[
                {
                    validator: (_, value: { value: string }) => {
                        if (!value.value) {
                            return Promise.reject('请输入用户身高');
                        }
                        return Promise.resolve();
                    },
                },
            ]} name="raise" required>
                <PeopleEidtItem name="身高" />
            </Form.Item>
            <Form.Item label='用户体重' name="weight" rules={[
                {
                    validator: (_, value: { value: string }) => {
                        if (!value.value) {
                            return Promise.reject('请输入用户体重');
                        }
                        return Promise.resolve();
                    },
                },
            ]} required>
                <PeopleEidtItem name="体重" />
            </Form.Item>
            <Form.Item label='用户照片' name="photo" required>
                <UserImage />
            </Form.Item>
        </Form>
    </div>
}

export default UserCreate