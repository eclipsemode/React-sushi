import { Stack } from '@mui/material';
import styles from './index.module.scss';
import Image from "next/image";

interface IProps {
    image?: string;
    text: string;
    color?: string;
    active?: boolean;
    clickEvent?: () => void
}

const MenuButton = ({ image, text, color, active = false, clickEvent }: IProps) => {
    return (
        <Stack spacing={1} className={!!active ? styles.rootActive : styles.root} alignItems="center" onClick={clickEvent}>
            <div style={{position: 'relative', height: '30px', width: '100%'}}><Image src={image ?? ''} fill sizes='(max-width: 120px) 100vw' style={{objectFit: 'contain'}} alt={text} loading="lazy" /></div>
            <h2 style={{ color, fontSize: '17px', lineHeight: '21px' }}>{text}</h2>
        </Stack>
    );
};

export default MenuButton;
