import React, {Component} from 'react';
import '../css/main.css'
import {setCellValue, setIntialData} from "../actions/boardActions";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import '../css/fonts.css'
import '../css/main.css'
class Node extends Component {
    constructor(props) {
        super(props);
        this.state={
            val:"",
            id:this.props.id,
            row:this.props.row,
            col:this.props.col
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.data)
    {
        this.setState({val:nextProps.data[this.state.row][this.state.col]});
    }
    }

    async changeHandler(evt) {
        let value = String(evt.target.value)
        if ((value>=0&&value<=9))
        {await this.setState({val: Number(evt.target.value)})
             this.props.setCellValue(this.props.row, this.props.col, Number(this.state.val));
            console.log(this.state)
        } else {

          await this.setState({val: Number(value.charAt(0))});
            this.props.setCellValue(this.props.row, this.props.col,Number(value.charAt(0)));
            evt.preventDefault();
            console.log(this.state)
            alert("values between 1 to 9 allowed");
        }
    }
   async componentDidMount() {
        await this.setState({val:this.props.value,row:this.props.row,col:this.props.col});
    }
    onlyNumberKey(evt) {

        // Only ASCII charactar in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }
    render() {
        return (
            <div className={"node p-10 font-plex" + this.props.text_class} id={`cell-${this.props.id}`}>
                {
                    <input type="text" onKeyPress={this.onlyNumberKey.bind(this)}
                           name={"val"}
                           value={this.state.val===0?"":this.state.val}
                           onChange={this.changeHandler.bind(this)}
                           readOnly={this.props.readOnly}
                    />
                }
            </div>
        );
    }
}

Node.propTypes={
    setCellValue:PropTypes.func.isRequired
};
const mstp=(state)=>({
data:state.data.board,
    status:state.data.status
});
export default connect(mstp,{setCellValue})(Node);