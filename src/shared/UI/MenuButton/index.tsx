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
            <Image src={image ?? ''} width={30} height={30} alt={text} loading="lazy" />
            <span style={{ color }}>{text}</span>
        </Stack>
    );
};

export default MenuButton;
