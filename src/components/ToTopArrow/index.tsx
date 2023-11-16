'use client';
import React from 'react';
import styles from './index.module.scss';
import { Affix } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';

const ToTopArrow: React.FC = () => {
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const [arrowHidden, setArrowHidden] = React.useState<boolean>(true);

  const isCheckOffset = React.useCallback(() => {
    window.scrollY > 100 ? setArrowHidden(false) : setArrowHidden(true);
  }, []);

  React.useEffect(() => {
    isCheckOffset();
    window.addEventListener('scroll', () => {
      isCheckOffset();
    });
  }, [isCheckOffset]);

  return arrowHidden ? null : (
    <Affix
      style={{
        position: 'absolute',
        bottom: '7em',
        right: deviceType === DeviceType.DESKTOP ? '8em' : '2em',
      }}
      offsetBottom={120}
    >
      <a href="#top">
        <ArrowUpOutlined className={styles.root} />
      </a>
    </Affix>
  );
};

export default ToTopArrow;
