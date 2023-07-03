import React from "react";
import {IUserInfo} from "@store/features/user";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import styles from "./Settings.module.scss";
import {clearMaterialDialog, selectMaterialDialog, setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@shared/UI/input";
import {Box, Skeleton, Stack, Tooltip} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const {userInfo} = useAppSelector(state => state.userReducer);
    const {applyCallback} = useAppSelector(selectMaterialDialog);
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        watch,
        formState: {errors}
    } = useForm<Partial<IUserInfo>>();

    React.useEffect(() => {
        reset({
            ...userInfo,
            dateOfBirth: String(userInfo?.dateOfBirth)?.slice(0, 10)
        })
    }, [reset, userInfo])

    React.useEffect(() => {
        if (!!applyCallback) {
            reset();
            dispatch(clearMaterialDialog());
        }
    }, [applyCallback, dispatch, reset])

    const validateSubmit = React.useCallback((): boolean => {
        (function deleteLastDigitFromTel() {
            if ((watch('tel')?.length || 0) > 18) {
                setValue('tel', watch('tel')?.slice(0, 18))
            }
        })()

        return ((watch('surname')?.length || 0) > 0 ? watch('surname') : null) === userInfo?.surname
            && watch('name') === userInfo?.name
            && String(userInfo?.dateOfBirth)?.slice(0, 10) === (String(watch('dateOfBirth'))?.length > 0 ? watch('dateOfBirth') : null)
            && userInfo?.email === ((watch('email')?.length || 0) > 0 ? watch('email') : null)
            && userInfo?.tel === ((watch('tel')?.length || 0) > 0 ? watch('tel') : null)
            && userInfo?.street === ((watch('street')?.length || 0) > 0 ? watch('street') : null)
            && userInfo?.house === (String(watch('house'))?.length > 0 ? watch('house') : null)
            && userInfo?.entrance === (String(watch('entrance'))?.length > 0 ? watch('entrance') : null)
            && userInfo?.floor === (String(watch('floor'))?.length > 0 ? watch('floor') : null)
            && userInfo?.room === (String(watch('room'))?.length > 0 ? watch('room') : null)
    }, [userInfo, watch, setValue])

    const handleResetButton = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.PROFILE_SETTINGS_RESET
        }))
    };

    const onSubmit: SubmitHandler<Partial<IUserInfo>> = ({
                                                             email,
                                                             name,
                                                             surname,
                                                             dateOfBirth,
                                                             tel,
                                                             street,
                                                             house,
                                                             floor,
                                                             entrance,
                                                             room
                                                         }) => {
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.PROFILE_SETTINGS_SEND,
            data: {email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}
        }))
    }

    return (
        <section className={styles.root}>
            <form onReset={(event) => handleResetButton(event)} onSubmit={handleSubmit(onSubmit)} name='settings'
                  className={styles.form}>
                <Input error={!!errors.name} register={register} name='name' label='Имя' required={true} maxLength={20}
                       validate={(value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)} defaultValue={userInfo?.name}/>
                <Input register={register} name='surname' label='Фамилия' maxLength={20}
                       defaultValue={userInfo?.surname}/>
                <Input error={!!errors.dateOfBirth} register={register} name='dateOfBirth' label='Дата рождения'
                       type='date' defaultValue={String(userInfo?.dateOfBirth)?.slice(0, 10)}/>
                <Input error={!!errors.email} register={register} name='email' label='Email' required={true}
                       pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                       defaultValue={userInfo?.email}/>
                <Input inputMask={true} error={!!errors.tel} register={register} name='tel' mask='+7 (999) 999-99-99'
                       maskChar='' label='+7 (xxx) xxx-xx-xx' type='tel' required={true} minLength={18} maxLength={18}
                       defaultValue={userInfo?.tel}/>
                <Input register={register} name='street' label='Улица' defaultValue={userInfo?.street}/>
                <Stack spacing={2}>
                    <Stack direction='row' spacing={2}>
                        <Input register={register} name='house' label='Дом' type='number'
                               defaultValue={userInfo?.house}/>
                        <Input register={register} name='entrance' label='Подьезд' type='number'
                               defaultValue={userInfo?.entrance}/>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Input register={register} name='floor' label='Этаж' type='number'
                               defaultValue={userInfo?.floor}/>
                        <Input register={register} name='room' label='Квартира' type='number'
                               defaultValue={userInfo?.room}/>
                    </Stack>
                </Stack>
                <Stack direction='row' className={styles.root__buttons}>
                    {
                        Object.keys(getValues()).length !== 0 ? <>
                                <Tooltip title={validateSubmit() && 'Изменения отсутствуют'} arrow placement='top'>
                                    <Box>
                                        <SimpleButton color={Colors.$mainColor}
                                                      disabled={validateSubmit()}
                                                      variant='contained'
                                                      type='reset'>Сбросить</SimpleButton>
                                    </Box>
                                </Tooltip>
                                <Tooltip title={validateSubmit() && 'Изменения отсутствуют'} arrow placement='top'>
                                    <Box>
                                        <SimpleButton variant='contained' type='submit'
                                                      disabled={validateSubmit()}>Изменить</SimpleButton>
                                    </Box>
                                </Tooltip>
                            </>
                            : <>
                                <Skeleton className={styles.skeleton__button} animation='wave'/>
                                <Skeleton className={styles.skeleton__button} animation='wave'/>
                            </>
                    }
                </Stack>
            </form>
        </section>
    );
};

export default Settings;