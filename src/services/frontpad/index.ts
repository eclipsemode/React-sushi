import { enqueueSnackbar } from 'notistack';
import { $api_frontpad } from '@services/api';
import { ICartProduct } from '@store/features/cart/api';

interface IOrderFrontpad {
  product_mod?: string[];
  product_price?: number[];
  score?: number;
  sale?: number;
  sale_amount?: number;
  card?: number;
  street?: string;
  home?: number;
  pod?: number;
  et?: number;
  apart?: number;
  phone?: string;
  mail?: string;
  descr?: string;
  name?: string;
  pay?: 1 | 1228; // 1 - нал, 1228 - онлайн
  certificate?: string;
  person?: number;
  tags?: string[];
  hook_status?: string[];
  hook_url?: string;
  channel?: 2030 | 2170;
  datetime?: string; //ГГГГ-ММ-ДД ЧЧ:ММ:СС
  affiliate?: number;
  point?: number;
}

interface IParsedProducts {
  product: string[];
  product_kol: string[];
}

class FrontpadApi {
  constructor() {}

  public async newOrder(cartItems: ICartProduct[], body?: IOrderFrontpad) {
    try {
      return `new_order?${this.composeParams(
        process.env.FRONTPAD_SECRET || '',
        cartItems,
        body
      )}`;
      const res = await $api_frontpad.post(
        `new_order?${this.composeParams(
          process.env.FRONTPAD_SECRET || '',
          cartItems,
          body
        )}`
      );
      return res.data;
    } catch (e) {
      enqueueSnackbar('Ошибка отправки заказа', { variant: 'error' });
    }
  }

  private composeParams(
    secret: string,
    cartItems: ICartProduct[],
    body?: IOrderFrontpad
  ): string {
    const { product, product_kol } = this.parseToFrontpadProduct(cartItems);

    let params = '';
    params += `secret=${secret}`;

    if (body) {
      for (let [key, value] of Object.entries(body)) {
        if (key !== 'tags' && key !== 'hook_status') {
          params += `&${key}=${value}`;
        }
      }
    }

    if (body?.tags) {
      body.tags.forEach((value, index) => {
        params += `&tags[${index}]=${value}`;
      });
    }

    if (body?.hook_status) {
      body.hook_status.forEach((value, index) => {
        params += `&hook_status[${index}]=${value}`;
      });
    }

    product.forEach((_, index) => {
      params += `&product[${index}]=${product[index]}&product_kol[${index}]=${product_kol[index]}`;
    });
    return params;
  }

  private parseToFrontpadProduct(cartItems: ICartProduct[]): IParsedProducts {
    const newObj: { product: string[]; product_kol: string[] } = {
      product: [],
      product_kol: [],
    };

    cartItems.map((item) => {
      if (item.sku) {
        newObj.product.push(item.sku);
      }
      newObj.product_kol.push(String(item.amount));
    });

    return newObj;
  }
}

export default FrontpadApi;
