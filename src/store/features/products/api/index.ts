import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { $api } from '@services/api';
import { SortOrderType, SortType } from '@store/features/filter/model';
import {
  IChangeProduct,
  ICreateProduct,
  IProduct,
  IProductOrderChange,
  ProductsStatus,
} from '@store/features/products/model';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>('products/fetchProducts', async (_, { rejectWithValue, getState }) => {
  try {
    const { filterReducer } = getState();
    const { data } = await $api.get(
      `api/product?categoryId=${filterReducer.categoryId || ''}&sortBy=${
        filterReducer.sortType || SortType.ORDER_INDEX
      }&sortOrder=${filterReducer.sortOrder || SortOrderType.ASC}`
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const createProduct = createAsyncThunk<IProduct, ICreateProduct>(
  'products/createProduct',
  async (
    {
      isPizza,
      name,
      rating,
      description,
      image,
      categoryId,
      productSizes,
      productPrices,
      productSkus,
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append('isPizza', String(isPizza));
      formData.append('name', name);
      formData.append('description', description);
      formData.append('rating', String(rating));
      formData.append('categoryId', categoryId);
      if (image) formData.append('image', image);
      formData.append('productSizes', String(productSizes));
      formData.append('productPrices', String(productPrices));
      formData.append('productSkus', String(productSkus));

      const response = await $api.post('api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProducts = createAsyncThunk<IProduct[], void>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get('api/product/');
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk<string, number>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`api/product/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changeProductsOrder = createAsyncThunk<
  void,
  IProductOrderChange[]
>(
  'products/changeProductsOrder',
  async (orderArr, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.post('api/product/change-order', {
        orderArr,
      });
      await dispatch(getProducts()).unwrap();
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changeProduct = createAsyncThunk<
  void,
  Record<'id', number> & IChangeProduct
>(
  'products/changeProduct',
  async (
    {
      id,
      name,
      price,
      rating,
      description,
      image,
      categoryId,
      sku,
      orderIndex,
      type,
      size,
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('id', String(id));
      formData.append('name', name);
      formData.append('price', JSON.stringify(price));
      formData.append('rating', String(rating));
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }
      formData.append('categoryId', String(categoryId));
      if (size) {
        formData.append('size', JSON.stringify(size));
      }
      if (sku) {
        formData.append('sku', JSON.stringify(sku));
      }
      if (orderIndex) {
        formData.append('orderIndex', String(orderIndex));
      }
      if (type) {
        formData.append('type', type);
      }

      const response = await $api.put('api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export interface IProductsState {
  products: IProduct[];
  productsStatus: ProductsStatus;
}

const initialState: IProductsState = {
  products: [],
  productsStatus: ProductsStatus.PENDING,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = ProductsStatus.PENDING;
        state.products = [];
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.productsStatus = ProductsStatus.FULFILLED;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.productsStatus = ProductsStatus.REJECTED;
        state.products = [];
      })
      .addCase(createProduct.pending, (state) => {
        state.productsStatus = ProductsStatus.PENDING;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.productsStatus = ProductsStatus.FULFILLED;
      })
      .addCase(createProduct.rejected, (state) => {
        state.productsStatus = ProductsStatus.REJECTED;
      })
      .addCase(getProducts.pending, (state) => {
        state.productsStatus = ProductsStatus.PENDING;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.productsStatus = ProductsStatus.FULFILLED;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.productsStatus = ProductsStatus.REJECTED;
        state.products = [];
      });
  },
});

export const selectProducts = (state: RootState) => state.productsReducer;
export default productsSlice.reducer;
