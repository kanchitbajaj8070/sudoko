import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from "./components/Grid";
import {Button} from "react-bootstrap";
function App() {
  return (
    <div className="App justify-content-sm-center bg-light ">
        <div className="mt-1 display-4 text-dark pb-20 mb-10 font-plex justify-content-sm-center">
            Sudoko Solver
        </div>
        <div className="h5 mt-1 text-muted pb-20 mb-10 text-center font-plex justify-content-sm-center text-info ">
            <p>(* <span className="text-dark">Black </span>
                values are fixed values provided by us . Fill the <span className="text-dark">
                  Empty
                </span>  spaces with values from
                1 to 9 *)
            </p>
        </div>
        <div className="grid">
        <Grid/>
        </div>

    </div>
  );
}

export default App;
