import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$api} from "@services/api";

type CategoriesStatusType = 'fulfilled' | 'pending' | 'rejected';

export interface ICategories {
    id: number,
    name: string,
    image: string,
    orderIndex: number
}

export interface ICreateCategory {
    name: string,
    image: File
}

interface IChangeCategory {
    id: number,
    name: string,
    image: File
}

interface IChangeCategoryOrder {
    id: number,
    orderIndex: number
}

export interface ICategoryState {
    categories: ICategories[];
    categoriesStatus: CategoriesStatusType;
}

export const fetchCategories = createAsyncThunk<ICategories[], void, { rejectValue: string }>(
    "categories/fetchCategories",
    async (_, {rejectWithValue}) => {
        try {
            const res = await $api.get("api/categories");
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const createCategory = createAsyncThunk<void, ICreateCategory>(
    'categories/createCategory',
    async ({name, image}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image)
            const res = await $api.post('api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const deleteCategory = createAsyncThunk<void, string>(
    'categories/deleteCategory',
    async (id, {rejectWithValue}) => {
        try {
            const res = await $api.delete(`api/categories/${id}`);
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const changeCategory = createAsyncThunk<void, IChangeCategory>(
    'categories/changeCategory',
    async ({id, name, image}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('id', String(id));
            formData.append('name', name);
            if (image) {
                formData.append('image', image);
            }
            const res = await $api.put('api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const changeCategoryOrder = createAsyncThunk<void, IChangeCategoryOrder[]>(
    'categories/changeCategoryOrder',
    async (categoryArr, {rejectWithValue}) => {
        try {
            const res = await $api.patch('api/categories', {data: categoryArr});
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

const initialState: ICategoryState = {
    categories: [],
    categoriesStatus: 'pending'
}

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategories[]>) => {
            state.categories = action.payload;
            state.categoriesStatus = 'fulfilled';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategories[]>) => {
                state.categories = action.payload;
                state.categoriesStatus = 'fulfilled';
            })
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesStatus = 'pending';
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.categoriesStatus = 'rejected';
            });
    }
})

export const {setCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;