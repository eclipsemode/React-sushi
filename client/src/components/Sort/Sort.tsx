import React from 'react';

import Popup from './Popup/Popup';
import sortNames, { SortNameType } from './SortNames';
import { selectFilter } from 'entities/filterSlice';
import { useAppSelector } from "app/utils";

const Sort: React.FC = () => {
    const [popupHidden, setPopupHidden] = React.useState<boolean>(true);
    const { sortId } = useAppSelector(selectFilter);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const sortedItem = sortNames?.find((obj: SortNameType) => obj.id === sortId)?.text;

    const handlePopup = () => setPopupHidden(!popupHidden);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent | React.PropsWithRef<any>) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setPopupHidden(true);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="sort" ref={popupRef}>
            <div className="sort__label">
                {popupHidden ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                        className="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                        id="IconChangeColor"
                    >
                        <path
                            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                            id="mainIconPathAttribute"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                        className="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                        id="IconChangeColor"
                        transform="rotate(180)"
                    >
                        <path
                            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                            id="mainIconPathAttribute"
                        ></path>
                    </svg>
                )}
                <b>Сортировка по:</b>
                <span onClick={() => handlePopup()}>{sortedItem}</span>
            </div>
            <Popup popupHidden={popupHidden} sortNames={sortNames} handlePopup={handlePopup} popupRef={popupRef} />
        </div>
    );
};

export default Sort;
