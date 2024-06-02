import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ListItemText from '@mui/material/ListItemText';
import {
  IBranch,
  selectBranch,
  setCurrentBranch,
} from '@store/features/branch/api';
import { setCookie } from '@shared/utils/Cookie';

const HeaderPickCity = () => {
  const dispatch = useAppDispatch();
  const { currentBranch, allBranches } = useAppSelector(selectBranch);
  const [branch, setBranch] = React.useState<IBranch | null>(currentBranch);

  const callback = () => {
    if (branch) {
      dispatch(setCurrentBranch(branch));
      setCookie('branch-initial', branch.id, 1);
    }
  };

  const handleAgree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );

    callback();
  };

  const handleDisagree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">Выбор города</DialogTitle>
      <DialogContent>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            '& li:hover': { background: Colors.$rootTextHover },
          }}
          aria-label="contacts"
        >
          {allBranches.map((obj) =>
            obj.name === branch?.name ? (
              <ListItem key={obj.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationCityIcon sx={{ color: Colors.$rootTextActive }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={obj.name}
                    sx={{ color: Colors.$rootTextActive }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                key={obj.id}
                onClick={() => setBranch(obj)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    inset
                    primary={obj.name}
                    sx={{ color: Colors.$rootText }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          clickEvent={handleDisagree}
          color={Colors.$mainColor}
          variant="contained"
        >
          Отменить
        </SimpleButton>
        <SimpleButton clickEvent={handleAgree} variant="contained">
          Подтвердить
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default HeaderPickCity;
