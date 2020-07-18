import React, {Component} from 'react';
import Node from "./Node";
import '../css/fonts.css'
import '../css/main.css'
import {SUDOKO_BOARD} from "../Constants";
import {connect} from "react-redux";
import {clearData, setIntialData, setIntialData1, setNewData, setOriginalData} from "../actions/boardActions";
import PropTypes from "prop-types"
import store from "../store";
import {SET_DATA, SET_INTIAL_DATA} from "../actions/types";
import {Spinner, Tooltip} from "react-bootstrap";
import {validateSudoko} from "../Validator";
import Message from "./Message";

class Grid extends Component {
    constructor() {
        super();
        this.state={
            grid:[],
            originalData:[],
            status:"",
            isloading:false,
            message:""

        }
    }

 findFirstUnassignedLocation(grid)
    { let res=[0,0];
        for( let i=0;i<grid.length;i++)
        {
            for( let j=0;j<grid[i].length;j++)
            {
                if(grid[i][j]===0)
                {
                    res[0]=i;
                    res[1]=j;
                }
            }
        }
        return res;
    }
   isValid( board,i,j)
    {
        return (i>=0)&&(i<board.length)&&(j>=0)&&(j<board[0].length)&&(board[i][j]===0);
    }
 isSafe( board,n,r,c,key)
    {
        for (let  i = 0; i < board.length; i++)
        {
            if( board[i][c]===key||board[r][i]===key)
                return false;
        }
        let k=r-(r%3);
        let l=c-(c%3);
        for (let i = k; i <k+3 ; i++) {
            for (let j = l; j <l+3 ; j++) {
                if( board[i][j]===key)
                    return false;
            }
        }
        return true;
    }
 solveSudokoHelper(board, n)
{
    let dim=this.findFirstUnassignedLocation(board,n);
    if( dim[0]===0&&dim[1]===0)
{
    this.setState({grid:board,status:"solved",isloading:false});
store.dispatch({
    type:SET_DATA,
    payload:this.state.grid,
    status:"solved"
});
    return  true;
}
let i=dim[0];
let j=dim[1];
for( let digit=1;digit<=9;digit++)
{
   if( this.isSafe(board,n,i,j,digit)===true)
        {
            board[i][j]=digit;
           if( this.solveSudokoHelper(board,n))
               return true;
            board[i][j]=0;
        }
}
}
componentDidUpdate(prevProps, prevState, snapshot) {
        if( prevProps.status!==this.props.status)
        {
            this.setState({grid:this.props.grid});
        }
}

    solveSudoko(grid)
    {
        if(grid.length===0)
            return;
        this.solveSudokoHelper(this.state.originalData,9);
    }
  solveMeHandler(event)
    {
        event.preventDefault();
        console.table("orginalData",this.state)
        this.setState({isloading:true});
    setTimeout(()=>{this.solveSudoko(this.state.originalData)},200);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.status)
        {this.setState({status:nextProps.status})
        if(nextProps.grid)
        {
            this.setState({grid:nextProps.grid})
        }
    if(nextProps.originalBoard&&this.state.originalData.length===0)
    {
        this.setState({originalData:nextProps.originalBoard})
    }
        }

    }
    verifySudokoHandler(event) {
        event.preventDefault();
        let isValid = validateSudoko(this.state.grid);
        console.log(isValid)
        if (isValid) {
            this.setState({message: " You solved the sudoko succesfully"});
     setTimeout(()=>this.setState({message:""}),4000);
        } else {
            this.setState({message: " The answer is wrong"});
            setTimeout(()=>this.setState({message:""}),4000);
        }
    }
    componentDidMount() {
        this.props.setIntialData();
      if(this.state.originalData.length===0)
        this.props.setOriginalData();
    }
 handleReset(event)
{

  this.props.setIntialData();
}
    render() {
        let grid=[]
        const board=this.state.grid;
        console.log(this.state)
        if(board.length>0)
        {
            grid=[]
        for( let i=0;i<=8;i++) {
            for (let j = 0; j <= 8; j++) {
                if (this.state.status === "solved") {
            if(this.state.originalData[i][j]===0) {

                grid.push(<Node row={i} col={j} id={i * 9 + j} value={this.state.grid[i][j]} readOnly={"readOnly"}
                                text_class={"font-merri text-success solved-cell"}/>);
            }
            else {
                grid.push(<Node row={i} col={j} id={i * 9 + j} value={this.state.grid[i][j]} readOnly={"readOnly"}
                                text_class={"font-merri text-success valid-cell"}/>)
            }
                } else if(this.state.status==="intial") {
                    if (board[i][j] === 0)
                        grid.push(<Node row={i} col={j} id={i * 9 + j} value= {0} disabled={false}
                                        text_class={"font-plex "} />)
                    else
                        grid.push(<Node row={i} col={j} id={i * 9 + j} value={board[i][j]} disabled={true}
                                        text_class={"text-dark text-muted valid-cell font-merri "} key={i * 9 + j}
                                        readOnly={"readOnly"} />)
                }
            }
        }
        }
        return (
            <div className="justify-content-sm-center">  {this.state.message&&
            <div className="row justify-content-sm-center">
                <div className="col-sm-9 mb-10">
                <Message mesage={this.state.message}  />
            </div>
            </div>
            }
                <div className="container overflow-hidden shadow-lg mt-2">

                    <div className="row justify-content-sm-center h3  sudoko-board mb-0">
                        {grid}
                    </div>
                </div>
                <div className="button-bar-bottom" >
                    {this.state.isloading?(<div><Spinner animation={"border"} variant="secondary"/>
                    </div>):(<div>
                    <button className="btn btn-dark col-sm-4 m-2   text-center button"
                            onClick={this.solveMeHandler.bind(this)} disabled={this.state.status==="solved"}>
                    Solve For Me</button>
                    <button className="btn btn-dark col-sm-4 m-2   text-center button " onClick={this.verifySudokoHandler.bind(this)}>
                        Submit Your answer</button>
                    <br/>
                    <button onClick={this.handleReset.bind(this)} className="btn button btn-danger col-sm-4 m-2   text-center">
                        Clear Board</button>
                    <br/>
                </div>)}
            </div>
            </div>
        );
    }
}
Grid.propTypes={
    setIntialData:PropTypes.func.isRequired,
    setOriginalData:PropTypes.func.isRequired,
    clearData:PropTypes.func.isRequired,
    grid:PropTypes.array.isRequired,
    status:PropTypes.string.isRequired
}
const mstp=(state)=>({
grid:state.data.board,
 status:state.data.status,
    originalBoard:state.data.originalBoard
});
export default connect(mstp,{setIntialData,clearData,setOriginalData})(Grid);

