import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSortType, setSortId, setSortOrder, selectFilter } from '../../../redux/features/filterSlice';
import { SortNameType } from '../SortNames';

type PopupProps = {
    popupHidden: boolean;
    sortNames: SortNameType[];
    handlePopup: () => void;
    popupRef: React.RefObject<HTMLDivElement>;
};

const Popup: React.FC<PopupProps> = ({ popupHidden, sortNames, handlePopup, popupRef }) => {
    const { sortId } = useSelector(selectFilter);
    const dispatch = useDispatch();

    const handleSortType = (id: number) => {
        const sortObj = sortNames.find((obj: SortNameType) => obj.id === id);

        if (!sortObj) return;

        dispatch(setSortId(sortObj.id));
        dispatch(setSortType(sortObj.sortType));
        dispatch(setSortOrder(sortObj.orderType));

        handlePopup();
    };

    return (
        <div ref={popupRef} hidden={popupHidden} className="sort__popup">
            <ul>
                {sortNames.map((obj: SortNameType) => (
                    <li
                        key={obj.id}
                        className={sortId === obj.id ? 'active' : ''}
                        onClick={() => handleSortType(obj.id)}
                    >
                        {obj.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Popup;
