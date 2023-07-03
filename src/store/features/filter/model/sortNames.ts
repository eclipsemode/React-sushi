import { SortOrderType, SortType } from "@store/features/filter/api";
import { SortNameType } from "@store/features/filter/model";

const SortNames: SortNameType[] = [
  { id: 0, sortType: SortType.RATING, orderType: SortOrderType.ASC, text: 'популярности' },
  {
    id: 1,
    sortType: SortType.RATING,
    orderType: SortOrderType.DESC,
    text: 'популярности по убыванию',
  },
  { id: 2, sortType: SortType.PRICE, orderType: SortOrderType.ASC, text: 'цене' },
  { id: 3, sortType: SortType.PRICE, orderType: SortOrderType.DESC, text: 'цене по убыванию' },
  { id: 4, sortType: SortType.NAME, orderType: SortOrderType.ASC, text: 'алфавиту' },
];

export { SortNames };