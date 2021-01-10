import React, { useState } from 'react';
import * as d3 from 'd3';


var reader = new FileReader();
var tableColumnsFromFirstRow;

var well_positions = 
['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'A12',
'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12',
'C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10', 'C11', 'C12',
'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10', 'D11', 'D12',
'E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E12',
'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12',
'G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07', 'G08', 'G09', 'G10', 'G11', 'G12',
'H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08', 'H09', 'H10', 'H11', 'H12'];

var well_positions_b = 
[{"A":['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'A12']},
{"B":['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12']},
{"C":['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10', 'C11', 'C12']},
{"D":['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10', 'D11', 'D12']},
{"E":['E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E12']},
{"F":['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12']},
{"G":['G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07', 'G08', 'G09', 'G10', 'G11', 'G12']},
{"H":['H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08', 'H09', 'H10', 'H11', 'H12']}];

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
      tableColumnsFromFirstRow = Object.keys(d);
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

  document.querySelector("#text_output").innerHTML = ("<h3>Plates info:</h3>" 
  + "<p>There are " + "<b>" + numofplates + "</b>" 
  + " plates.</p>" + "<b><i>Plate Names:</i></b> " + plateNames);

  document.querySelector("#create_plates").innerHTML = ("<h3>Create Cherry Pick Plates</h3>" + "<p><button className='btn' onClick={''}>Click to launch</button></p>")
  // Could specify table columns to grab from dataset
  // tabulate("#full_table_output", data, ["id", "first_name", "last_name"]); 

  // Or display all table columns from data present in first row
  tabulate("#table_output", data.filter(function(d,i){return i<5})); //show only top 5 rows
  
  //Display the cherry pick plates
  cherryPick("#cherrypick")

}

function cherryPick(baseSelector, data) {
  var cherrypick_table = d3.select(baseSelector).append("table");
  cherrypick_table.attr("class", "bordered");
  var thead = cherrypick_table.append("thead");
  var tbody = cherrypick_table.append("tbody");
  var side_headernames = ["A", "B", "C", "D", "E", "F", "G", "H"];
  var top_headernames = ["  ", "01","02","03","04", "05","06","07","08","09","10","11","12"];

  //append header row
  thead
    .selectAll("th")
    .data(top_headernames).enter()
    .append("th")
    .text(function(top_headernames){
      return top_headernames;
    });
  
  // create a row for each object in the data
  var rows = tbody.selectAll("tr")
    .data(well_positions_b)
    .enter()
    .append("tr");

  // create a cell in each row for each column
  var cells = rows.selectAll("td")
    .data(function(row) {
      return top_headernames.map(function(column) {
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
            <div id="cherrypick"></div> 
            
        </div>
    )
} 

export default LoadCSV
