export enum SortType {
  ORDER_INDEX = 'orderIndex',
  RATING = 'rating',
  PRICE = 'price',
  NAME = 'name',
}
export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortNameType = {
  id: number;
  sortType: SortType;
  orderType: SortOrderType;
  text: string;
};

export const SortNames: SortNameType[] = [
  {
    id: 0,
    sortType: SortType.ORDER_INDEX,
    orderType: SortOrderType.ASC,
    text: 'порядку',
  },
  {
    id: 1,
    sortType: SortType.RATING,
    orderType: SortOrderType.ASC,
    text: 'популярности',
  },
  {
    id: 2,
    sortType: SortType.RATING,
    orderType: SortOrderType.DESC,
    text: 'популярности по убыванию',
  },
  {
    id: 3,
    sortType: SortType.PRICE,
    orderType: SortOrderType.ASC,
    text: 'цене',
  },
  {
    id: 4,
    sortType: SortType.PRICE,
    orderType: SortOrderType.DESC,
    text: 'цене по убыванию',
  },
  {
    id: 5,
    sortType: SortType.NAME,
    orderType: SortOrderType.ASC,
    text: 'алфавиту',
  },
];
