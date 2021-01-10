import React, { useState } from 'react';
import * as d3 from 'd3';


var reader = new FileReader();
var tableColumnsFromFirstRow;

function loadFile() {
  var file = document.querySelector("input[type=file]").files[0];

  // TODO: What's the last param that's false?
  reader.addEventListener("load", parseFile, false);
  if (file) {
    reader.readAsText(file);
  }
}

function parseFile() {
  var data = d3.csvParse(reader.result, function(d, i) { //i => index
    if (i === 0) {                                       // if index is 0, i.e the first row keys will be used as table columns name
      tableColumnsFromFirstRow = Object.keys(d);;
    }
    return d;
  });

  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x){
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  var firstColName = tableColumnsFromFirstRow[0]; //Get first column name

  var groupbyplate = groupBy(data, firstColName); //Group by first column name => Plate ID
  //console.log(groupbyplate['S80175422']);

  var plateNames = Object.keys(groupbyplate);

  var numofplates = Object.keys(groupbyplate).length


  var groupbyplateJSON = JSON.stringify(groupbyplate);

  document.querySelector("#text_output").innerHTML = ("<h3>Plates info:</h3>" 
  + "<p>There are " + "<b>" + numofplates + "</b>" 
  + " plates.</p>" + "<b><i>Plate Names:</i></b> " + plateNames);

  document.querySelector("#create_plates").innerHTML = ("<h3>Create Cherry Pick Plates</h3>" + "<p><button className='btn' onClick={''}>Click to launch</button></p>")
  // Could specify table columns to grab from dataset
  // tabulate("#full_table_output", data, ["id", "first_name", "last_name"]); 

  // Or display all table columns from data present in first row
  tabulate("#table_output", data.filter(function(d,i){return i<5})); //show only top 5 rows
  
}

// function parseFile() {
//   var data = d3.csvParse(reader.result, function(d, i) { //i => index
//     if (i === 0) {                                       // if index is 0, i.e the first row keys will be used as table columns name
//       tableColumnsFromFirstRow = Object.keys(d);;
//     }
//     return d;
//   });

//   var groupBy = function(xs, key) {
//     return xs.reduce(function(rv, x){
//       (rv[x[key]] = rv[x[key]] || []).push(x);
//       return rv;
//     }, {});
//   };

//   var firstColName = tableColumnsFromFirstRow[0]; //Get first column name

//   var groupbyplate = groupBy(data, firstColName); //Group by first column name => Plate ID
//   //console.log(groupbyplate['S80175422']);

//   var plateNames = Object.keys(groupbyplate);

//   var numofplates = Object.keys(groupbyplate).length


//   var groupbyplateJSON = JSON.stringify(groupbyplate);

//   document.querySelector("#text_output").innerHTML = ("<h3>Plates info:</h3>" 
//   + "<p>There are " + "<b>" + numofplates + "</b>" 
//   + " plates.</p>" + "<b><i>Plate Names:</i></b> " + plateNames);

//   document.querySelector("#create_plates").innerHTML = ("<h3>Create Cherry Pick Plates</h3>" + "<p><button className='btn' onClick={''}>Click to launch</button></p>")
//   // Could specify table columns to grab from dataset
//   // tabulate("#full_table_output", data, ["id", "first_name", "last_name"]); 

//   // Or display all table columns from data present in first row
//   tabulate("#table_output", data.filter(function(d,i){return i<5})); //show only top 5 rows
  
// }

function tabulate(baseSelector, data, columns) {
  var table = d3.select(baseSelector).append("table");
  table.attr("class", "bordered");
  var thead = table.append("thead");
  var tbody = table.append("tbody");

  // Use all possible columns stored from parsing first row of data
  if (typeof columns === "undefined") {
    var columns = tableColumnsFromFirstRow;
  }

  // append the header row
  thead.append("tr")
    .selectAll("th")
    .data(columns).enter()
    .append("th")
    .text(function(column) {
      return column;
    });

  // create a row for each object in the data
  var rows = tbody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  // create a cell in each row for each column
  var cells = rows.selectAll("td")
    .data(function(row) {
      return columns.map(function(column) {
        return {
          column: column,
          value: row[column]
        };
      });
    })
    .enter()
    .append("td")
    .text(function(d) {
      return d.value;
    });
}

function createPlates(){

}

function LoadCSV(){
    return(
        <div>
            <h2 className="title">96 Well Cherry Picker</h2>
            <input type='file' class="file-input" onChange={loadFile}/>
            <br />
            <div id="text_output"></div>
            <h3 className="preview-title">File Preview</h3>
            <div id="table_output"></div>
            <div className="user-instructions">
                <p>Only the <b><i>header</i></b> and <b><i>top 5 rows</i></b> will be shown.</p>
                <p>Please check:</p>
                <ol>
                  <li>First Column contains the <i><b>Plate ID</b></i></li>
                  <li>Second Column contains the <i><b>Well ID</b></i></li>
                  <li>Third Column contains the <i><b>Sample ID</b></i></li>
                </ol>
            </div>
            <div id="create_plates"></div> 
            
        </div>
    )
} 

export default LoadCSV
