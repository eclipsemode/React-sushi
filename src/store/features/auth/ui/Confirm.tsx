import React from 'react';
import Input from "@shared/UI/input";
import SimpleButton from "@shared/UI/SimpleButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {enqueueSnackbar} from "notistack";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {confirmAuth, signIn} from "@store/features/auth/api";
import {useRouter} from "next/navigation";
import RouterPath from "@shared/utils/menuPath";
import styles from './index.module.scss'
import {Box, CircularProgress, Stack} from "@mui/material";

interface IProps {
    requestId: string,
    tel: string
}

interface IConfirmForm {
    code: number
}

const Confirm = ({requestId, tel}: IProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {authLoadSaveProcess} = useAppSelector(state => state.authReducer);
    const [reqId, setNewReqId] = React.useState<string>(requestId);
    const [code, setCode] = React.useState<string>('');
    const [time, setTime] = React.useState<number>(60);
    const { register, handleSubmit, formState: { errors } } = useForm<IConfirmForm>();

    const handleFormSubmit: SubmitHandler<IConfirmForm> = async data => {
        try {
            await dispatch(confirmAuth({code: data.code, requestId: reqId})).unwrap();
            enqueueSnackbar('Вы успешно вошли в аккаунт', { variant: 'success' });
            router.push(RouterPath.HOME);
        } catch (e) {
            enqueueSnackbar('Вы ввели неправильный код', { variant: 'error' });
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => setTime(time - 1), 1000);

        if (time === 0) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [time])

    const handleRepeatAuth = async () => {
        if (time > 0) {
            return
        } else {
            try {
                const id = await dispatch(signIn(tel)).unwrap();
                setNewReqId(id);
                setTime(60);
            } catch (e) {
                enqueueSnackbar('Произошла ошибка, попробуйте позднее', { variant: 'error' })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <Stack direction='row' sx={{alignItems: 'flex-end', columnGap: '10px', width: '100%'}}>
                <Input register={register} name='code' inputMask={true} label='Введите код' maskChar='' mask='9999' value={code} onChangeEvent={setCode}
                       error={!!errors.code} validate={(value) => value.length === 4}
                       endAdornment={authLoadSaveProcess ? <CircularProgress size={20} /> : <Box width={20}></Box>} />
                <Stack alignItems='center'>
                    <span className={time > 0 ? styles.repeatButton_disabled : styles.repeatButton} onClick={handleRepeatAuth}>Выслать код повторно</span>
                    <span className={time > 0 ? styles.repeatButton_disabled : styles.repeatButton}>{time > 0 ? time : ''}</span>
                </Stack>
            </Stack>
            <SimpleButton variant='contained' type='submit'>Войти</SimpleButton>
        </form>
     );
};

export default Confirm;