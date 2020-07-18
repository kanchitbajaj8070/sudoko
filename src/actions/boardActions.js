import {SET_CELL, SET_DATA, SET_INTIAL_DATA, SET_ORIGINAL_DATA} from "./types";
import {SUDOKO_BOARD, SUDOKO_BOARD_1} from "../Constants";
export const setCellValue=(row,col,value)=>async dispatch=>
{

    dispatch({
    type:SET_CELL,
        row:row,
        col:col,
        value:value
    }
    )
}
export const setIntialData=()=>async dispatch=>
{
    let board =[
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i <9 ; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j]=SUDOKO_BOARD_1[i][j];
        }
    }
            dispatch({
                type:SET_INTIAL_DATA,
                payload:board,
                status:"intial"
            })
}
export const clearData=()=>async dispatch=>
{

    dispatch({
        type:SET_DATA,
        payload:[],
        status:"intial"
    })
}

export const setOriginalData=()=>async dispatch=>
{
   const board =[
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i <9 ; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j]=SUDOKO_BOARD[i][j];
        }
    }
    dispatch({
        type:SET_ORIGINAL_DATA,
        payload:board,
    })
}