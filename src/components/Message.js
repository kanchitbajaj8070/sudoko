import React, {Component, useState} from 'react';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const Message=(props)=>
{     const [show, setShow] = useState(true);
        return (
            <React.Fragment>
                <div className="mb-10">
                <Alert show={show} variant="success">
                    <Alert.Heading> {props.mesage}!!</Alert.Heading>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close
                        </Button>
                    </div>
                </Alert>
                {!show && <Button  className="mb-10" onClick={() => setShow(true)}>Show Message</Button>}
                </div>
            </React.Fragment>
        );
}
export default Message;
