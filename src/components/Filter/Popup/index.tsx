import React from 'react';
import styles from './index.module.scss';

import { selectFilter, setSort } from '@store/features/filter/api';
import { SortNameType } from '@store/features/filter/model';
import { useAppDispatch, useAppSelector } from '@store/hooks';

type PopupProps = {
  popupHidden: boolean;
  sortNames: SortNameType[];
  handlePopup: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
};

const Popup: React.FC<PopupProps> = ({
                                       popupHidden,
                                       sortNames,
                                       handlePopup,
                                       popupRef,
                                     }) => {
  const { sortId } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const handleSortType = (id: number) => {
    const sortObj = sortNames.find((obj: SortNameType) => obj.id === id);

    if (!sortObj) return;

    dispatch(setSort(sortObj));

    handlePopup();
  };

  return (
    <div ref={popupRef} hidden={popupHidden} className={styles.root}>
      <ul>
        {sortNames.map((obj: SortNameType) => (
          <li
            key={obj.id}
            className={sortId === obj.id ? styles.root__active : ''}
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
