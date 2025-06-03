import type { PeopleItem } from '../type/people'

export const PeopleList: PeopleItem[] = [
  {
    nickname: '张三',
    id: 1,
    age: '18',
    birthday: '2025/01/02',
    weight: {
      name: "体重",
      value: '180',
      show: 0
    },
    height: {
      name: "身高",
      value: '180',
      show: 0
    },
    image: {
      name: "照片",
      value: '180',
      show: 0
    },
  },
  {
    nickname: '李四',
    id: 2,
    age: '18',
    birthday: '2025/01/02',
    weight: {
      name: "体重",
      value: '180',
      show: 0
    },
    height: {
      name: "身高",
      value: '180',
      show: 0
    },
    image: {
      name: "照片",
      value: '180',
      show: 0
    },
  },
]

export const PeopleDetail = {
  nickname: '张三',
  id: 1,
  age: '18',
  birthday: '2025/01/02',
  weight: {
    name: "体重",
    value: '180',
    show: 0
  },
  height: {
    name: "身高",
    value: '180',
    show: 0
  },
  image: {
    name: "图片",
    value: '180',
    show: 0
  },
  custom: [
    {
      name: "图片",
      value: '180',
      show: 0
    }
  ],
}
