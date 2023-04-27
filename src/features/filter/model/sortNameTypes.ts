import { SortOrderType, SortType } from "features/filter/api";

type SortNameType = {
  id: number;
  sortType: SortType;
  orderType: SortOrderType;
  text: string;
};

export type { SortNameType }