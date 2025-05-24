import type { PeopleItem } from '../type/people'

export const PeopleList: PeopleItem[] = [
  {
    name: '张三',
    id: 1,
    age: '18',
    birthday: '2025/01/02',
    weight: '180',
    raise: '180',
    photo: '',
  },
  {
    name: '李四',
    id: 2,
    age: '18',
    birthday: '2025/01/02',
    weight: '180',
    raise: '180',
    photo: '',
  },
]

export const PeopleDetail = {
  name: '张三',
  id: 1,
  age: '18',
  birthday: '2025/01/02',
  weight: '180',
  raise: '180',
  photo: '',
  custom: [
    ['视力', '3.0'],
    ['听力', '5.0'],
  ],
}
