import { SortOrderType, SortType } from '@store/features/filter/api';
import { SortNameType } from '@store/features/filter/model';

const SortNames: SortNameType[] = [
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

export { SortNames };
