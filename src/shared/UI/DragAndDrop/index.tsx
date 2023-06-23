import React from 'react';
import type {Identifier, XYCoord} from 'dnd-core'
import {useDrag, useDrop} from "react-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from './index.module.scss';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {ItemTypes} from "./ItemTypes";
import {Stack} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {setMaterialDialog} from "../../../features/materialDialog/api";
import {MaterialDialogTypes} from "../../../features/materialDialog/model";

interface IProps {
    id: any
    text: string
    index: number
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

const DragAndDropItem = ({id, text, index, moveItem}: IProps) => {
    const dispatch = useAppDispatch();
    const ref = React.useRef<HTMLDivElement>(null)
    const [{handlerId}, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return {id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div className={styles.root} ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <Stack direction='row' sx={{justifyContent: 'space-between', width: '100%'}}>
                <Stack direction='row' sx={{alignItems: 'center'}}>
                    <DragIndicatorIcon/>
                    {text}
                </Stack>
                <RemoveCircleOutlineIcon color='error' sx={{cursor: 'pointer'}} onClick={() => dispatch(setMaterialDialog({
                    opened: true,
                    dialogType: MaterialDialogTypes.PROFILE_ADMIN_DELETE_PRODUCT,
                    data: { id }
                }))}/>
            </Stack>
        </div>
    )
};

export default DragAndDropItem;