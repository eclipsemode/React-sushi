'use client'
import React from 'react';
import styles from './index.module.scss'
import Image from "next/image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Colors from "@shared/utils/Colors";

interface IProps {
    cards: {
        id: number,
        title: string,
        img: string
    }[]
}

const CardScroll = ({cards}: IProps) => {
    const ulElement = React.useRef<HTMLUListElement>(document.createElement('ul'));

    const handleScroll = (direction: 'left' | 'right', value: number) => {
        if (direction === 'left') {
            ulElement.current.scrollLeft -= value
        } else {
            ulElement.current.scrollLeft += value
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer + ' ' + styles.arrowContainer__prev} onClick={() => handleScroll('left', 310)}>
                <ArrowBackIosIcon sx={{color: Colors.$infoColor, '& > path': {transform: 'translateX(3px)'} }} />
            </div>
            <ul className={styles.cards} ref={ulElement}>
                {
                    cards.map(card => (
                        <li key={card.id} className={styles.card}>
                            <div className={styles.imageContainer}><Image src={card.img} width={500} height={176}
                                                                          className={styles.image} alt='birthday_card'/>
                            </div>
                            <div style={{zIndex: '1', padding: '20px'}}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                            </div>
                            <div className={styles.cardLinkWrapper}>
                                <a href="" className={styles.cardLink}>Подробнее</a>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.arrowContainer + ' ' + styles.arrowContainer__next} onClick={() => handleScroll('right', 310)}>
                <ArrowForwardIosIcon sx={{color: Colors.$infoColor}} />
            </div>
        </div>
    );
};

export default CardScroll;