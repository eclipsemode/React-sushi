import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {CSSProperties} from "react";
import Colors from "@shared/utils/Colors";
import {Stack} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IProps {
    children: React.JSX.Element,
    title: string,
    description: string,
    style?: CSSProperties,
    classname?: string
}

const CustomDrawer = ({children, style, classname, title, description}: IProps) => {
    const [state, setState] = React.useState(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                background: Colors.$rootCardBackground,
                '& h2': {
                    color: Colors.$rootTextActive
                },
                '& span, & svg': {
                    color: Colors.$rootText
                },
                '& span': {
                    fontSize: '16px'
                }
        }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Stack className='container' alignItems='center' rowGap='30px' padding='30px 20px'>
                <h2>{title}</h2>
                <span>{description}</span>
                <SimpleButton variant='contained'>Закрыть</SimpleButton>
            </Stack>
        </Box>
    );

    return (
        <React.Fragment>
            <div className={classname} onClick={toggleDrawer(true)} style={style}>{children}</div>
            <Drawer
                anchor={'top'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list('top')}
            </Drawer>
        </React.Fragment>
    );
};

export default CustomDrawer;