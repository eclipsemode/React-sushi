import React, {useEffect} from 'react';
import {IBranch} from '@store/features/branch/api';
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Stack, Typography} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {usePosition} from "@hooks/usePosition";

export interface IPopoverLocationProps {
    currentBranch: IBranch | null;
    handleAgreePopover: () => void;
    onCityPickClick: () => void;
}

const PopoverLocation = ({
                             currentBranch,
                             handleAgreePopover,
                             onCityPickClick,
                         }: IPopoverLocationProps) => {
    const { city } = usePosition();
    // TODO Implement location check
    // const { allBranches } = useAppSelector(selectBranch);

    useEffect(() => {
        console.log(city)
    }, []);

    // useEffect(() => {
    //   let branchExists: IBranch | undefined = allBranches.find(
    //     (branch: IBranch) => branch.name === city
    //   );
    //
    //   if (
    //     !checkCookieExpire('branch-initial') &&
    //     allBranches &&
    //     city &&
    //     (!isAuth || !branchExists)
    //   ) {
    //     setOpenedPopover(true);
    //   }
    // }, [allBranches, city, isAuth]);


    const content = (
        <PopoverContent className='bg-neutral-900 rounded-md'>
            <Stack className='p-4'>
                <Typography sx={{p: 2, color: Colors.$rootText}}>
                    Ваш город {currentBranch?.name}?
                </Typography>
                <SimpleButton variant="contained" clickEvent={handleAgreePopover}>
                    Подтвердить
                </SimpleButton>
                <SimpleButton variant="text" clickEvent={onCityPickClick}>
                    Выбрать город
                </SimpleButton>
            </Stack>
        </PopoverContent>
    );

    return (
        <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
            <Popover defaultOpen={currentBranch !== null} key={"right-end"} placement="bottom-start" color="secondary">
                <PopoverTrigger>
                    <div></div>
                </PopoverTrigger>
                {content}
            </Popover>
        </div>
    );
};

export default PopoverLocation;
