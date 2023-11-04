'use client';
import React from 'react';
import styles from './index.module.scss';

import { Popup } from '@store/features/filter/ui';
import { SortNames, SortNameType } from '@store/features/filter/model';
import { selectFilter } from '@store/features/filter/api';
import { useAppSelector } from '@store/hooks';
import { CaretRightOutlined } from '@ant-design/icons';

const Sort: React.FC = () => {
  const [popupHidden, setPopupHidden] = React.useState<boolean>(true);
  const { sortId } = useAppSelector(selectFilter);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const sortedItem = SortNames?.find((obj: SortNameType) => obj.id === sortId)
    ?.text;

  const handlePopup = () => setPopupHidden(!popupHidden);

  React.useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | React.PropsWithRef<any>
    ) => {
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
    <div className={styles.root} ref={popupRef}>
      <div className={styles.root__label}>
        <CaretRightOutlined rotate={popupHidden ? 0 : 90} />
        <b>Сортировка по:</b>
        <span className={styles.root__link} onClick={() => handlePopup()}>
          {sortedItem}
        </span>
      </div>
      <Popup
        popupHidden={popupHidden}
        sortNames={SortNames}
        handlePopup={handlePopup}
        popupRef={popupRef}
      />
    </div>
  );
};

export default Sort;
