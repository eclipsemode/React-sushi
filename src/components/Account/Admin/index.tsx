'use client'
import React from 'react';
import styles from './index.module.scss'
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Colors from '@shared/utils/Colors';
import Tab from '@mui/material/Tab';
import AdminProducts from '@components/Account/Admin/Products';
import AdminCategories from '@components/Account/Admin/Categories';
import AdminPromocode from '@components/Account/Admin/Promocode';

const Admin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.container}>
      <Box
        sx={{ width: '100%', justifyContent: 'center' }}
        className={styles.tabsContainer}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={styles.tabs}
          TabIndicatorProps={{
            style: {
              backgroundColor: Colors.$rootTextActive,
            },
          }}
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            },
            '& .MuiTab-root': {
              color: Colors.$rootText,
            },
            '& .MuiTab-root.Mui-selected': {
              color: Colors.$rootTextActive,
            },
          }}
        >
          <Tab disabled={value === 0} label="Товары" className={styles.tab} />
          <Tab
            disabled={value === 1}
            label="Категории"
            className={styles.tab}
          />
          <Tab
            disabled={value === 2}
            label="Промокоды"
            className={styles.tab}
          />
        </Tabs>
      </Box>

      {value === 0 && <AdminProducts />}
      {value === 1 && <AdminCategories />}
      {value === 2 && <AdminPromocode />}
    </Box>
  );
};

export default Admin;