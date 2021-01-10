//Default React imports
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Dependencies imports


//External file imports
import './css/index.css';
import {plates} from './plates.js'
import Plate from './Plate'
import FileUpload from './load_csv'
import LoadCSV from './parse_csv'




function PlateList() {
  return (
      <section className='platelist'>
      {plates.map((plate)=> {
        return <Plate key={plate.id}{...plate}></Plate>;
      })}
    </section>
  );
}



ReactDOM.render(
<div>
  <LoadCSV />
  <PlateList />
</div>, 
document.getElementById('root'));

