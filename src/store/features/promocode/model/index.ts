export enum PromoCodeTypeEnum {
  RUB = 'RUB',
  percent = 'percent',
}

export interface IPromocode {
  id: string;
  code: string;
  type: PromoCodeTypeEnum;
  discount: number;
  limit: number;
}

export interface IPromocodeWithPagination {
  _count: number;
  list: IPromocode[];
}

export interface IPromocodeCreate extends Omit<IPromocode, 'id'> {}
export interface IChangePromocode extends IPromocode {}

export const PromoCodeListSize = 10;
