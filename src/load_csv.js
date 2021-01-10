//Default React imports
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Dependencies imports
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

//External files import
import './css/index.css';

function FileUpload(){
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    
    //process csv to JSON format
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
   
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
   
      setData(list);
      setColumns(columns);
    }
  
  
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      if(file){
        reader.readAsBinaryString(file)}
        else{
          //alert('Please select a file')
        }
  
    }





    return (
      <div>
        <h2 className="title">96 Well Cherry Picker</h2>
        <input
        type="file"
        accept=".csv, .xlsx,.xls"
        onChange={handleFileUpload}
        />
        <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
        />
        
        
      </div>
   
   
    )
}

  export default FileUpload