import {SET_CELL, SET_DATA, SET_INTIAL_DATA, SET_ORIGINAL_DATA} from '../actions/types'
import _ from 'lodash'
const intialState={
    board: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
],
    originalBoard:[],
    status:""
}
//bazel-bin/im2txt/run_inference \ --checkpoint_path=${CHECKPOINT_PATH} \ --vocab_file=${VOCAB_FILE} \ --input_files=${IMAGE_FILE}
export default function (state=intialState,action) {

    switch (action.type) {
        case SET_CELL:
            state.board[action.row][action.col]=action.value;
            return {...state};
        case SET_INTIAL_DATA:
            return {...state,board:action.payload,status: action.status}
        case SET_DATA:
            state.board=[];
            return {...state,board:action.payload,status: action.status}
        case SET_ORIGINAL_DATA:
            return {...state,originalBoard:_.cloneDeep(action.payload)}
        default:return state;
    }
}