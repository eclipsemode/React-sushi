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
  IBranches,
  selectLocation,
  setCurrentBranch,
} from '@store/features/location/api';
import { setCookie } from '@shared/utils/Cookie';

const HeaderPickCity = () => {
  const dispatch = useAppDispatch();
  const { currentBranch, allBranches } = useAppSelector(selectLocation);
  const [branchName, setBranchName] = React.useState<string>(currentBranch);

  const callback = () => {
    const branchData = allBranches.find(
      (branch: IBranches) => branch.name === branchName
    );
    dispatch(setCurrentBranch(branchName));
    setCookie('location-initial', branchData.id, 1);
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
          {allBranches.map((branch: IBranches) =>
            branch.name === branchName ? (
              <ListItem key={branch.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationCityIcon sx={{ color: Colors.$rootTextActive }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.name}
                    sx={{ color: Colors.$rootTextActive }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                key={branch.id}
                onClick={() => setBranchName(branch.name)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    inset
                    primary={branch.name}
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
