import React from 'react';
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {changePromoCode, getAllPromoCodes, IPromocode} from "@store/features/promocode/api";
import {enqueueSnackbar} from "notistack";
import {selectMaterialDialog, setMaterialDialog} from "@store/features/materialDialog/api";
import Input from "@shared/UI/input";
import styles from '../index.module.scss'

const ProfileAdminChangePromocode = () => {
    const dispatch = useAppDispatch();
    const {data} = useAppSelector(selectMaterialDialog);
    const {register, handleSubmit} = useForm<IPromocode>({
        defaultValues: {
            code: data.code || '',
            type: data.type || '',
            discount: data.discount || undefined,
            limit: data.limit || ''
        }
    });
    const success = async () => {
        await dispatch(getAllPromoCodes());
    };

    const callback = async (formData: IPromocode) => {
        try {
            await dispatch(changePromoCode({code: data.code, newValue: !formData.limit ? 'infinite' : formData.limit})).unwrap();
            enqueueSnackbar('Промокод успешно добавлен!', {variant: 'success'});
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Ошибка добавления промокода, попробуйте позднее', {variant: 'error'});
        }
        await success();
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));
    }

    const handleAgree: SubmitHandler<IPromocode> = async (formData) => {
        await callback(formData);
    }

    const handleDisagree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }))
    }

    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Изменение промокода
            </DialogTitle>
            <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
                <DialogContent>
                    <Input register={register} name='code' required disabled label='Код' />
                    <Input register={register} name='type' required disabled label='Тип' className={styles.row} />
                    <Input register={register} name='discount' required disabled label='Скидка' className={styles.row} />
                    <Input register={register} name='limit' type='number' required label='Лимит' className={styles.row} />
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <SimpleButton type='reset' color={Colors.$mainColor}
                                  variant='contained'>Отменить</SimpleButton>
                    <SimpleButton type='submit' variant='contained'>Подтвердить</SimpleButton>
                </DialogActions>
            </form>
        </>
    );
};

export default ProfileAdminChangePromocode;