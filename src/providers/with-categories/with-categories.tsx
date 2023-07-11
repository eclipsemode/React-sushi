import React from 'react';
import StoreCategories from "@providers/with-categories/StoreCategories";
//TODO разобраться с ререндером всего Page из-за категорий
async function getCategories() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/categories`, { cache: 'force-cache'});
    return response.json();
}


const WithCategories = async () => {
    const categories = await getCategories();
    return <StoreCategories categories={categories} />
};

export default WithCategories;