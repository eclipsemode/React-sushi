import styles from './index.module.scss'
import {useAppDispatch} from "../../../app/hooks";
import {Box} from "@mui/material";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import ProductsListDnD from "./Products/ProductsListDnD";
import {setMaterialDialog} from "../../../features/materialDialog/api";
import {MaterialDialogTypes} from "../../../features/materialDialog/model";

const Admin = () => {
    const dispatch = useAppDispatch();

    return (
        <Box className={styles.container}>
            <div className={styles.add_product} onClick={() => dispatch(setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_PRODUCT
            }))}>Добавить позицию</div>
            <DndProvider backend={HTML5Backend}>
                <ProductsListDnD />
            </DndProvider>
        </Box>
    );
};

export default Admin;