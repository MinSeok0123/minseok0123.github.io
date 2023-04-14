import { atom } from 'recoil'

export const selectedCategoryState = atom({
  key: 'selectedCategoryState',
  default: 'All',
})

export const categoryListState = atom({
  key: 'categoryListState',
  default: {},
})

export const categoryState = atom({
  key: 'categoryState',
  default: 'close',
})

export const activeTabState = atom<string>({
  key: 'activeTabState',
  default: '트렌딩',
})
