//React component for the 96 well
const Plate = (props) =>{
    const{plateName,A01, A02, A03, A04, A05, A06, A07, A08, A09, A10, A11, A12,
      B01, B02, B03, B04, B05, B06, B07, B08, B09, B10, B11, B12,
      C01, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, C12,
      D01, D02, D03, D04, D05, D06, D07, D08, D09, D10, D11, D12,
      E01, E02, E03, E04, E05, E06, E07, E08, E09, E10, E11, E12,
      F01, F02, F03, F04, F05, F06, F07, F08, F09, F10, F11, F12,
      G01, G02, G03, G04, G05, G06, G07, G08, G09, G10, G11, G12,
      H01, H02, H03, H04, H05, H06, H07, H08, H09, H10, H11, H12,} = props;
    return(<article className='plate'>
      <h3>{plateName}</h3>
      <table>
        <tr id="row">
          <th></th> {/*Well numerical headers */}
          <th>01</th>
          <th>02</th>
          <th>03</th>
          <th>04</th>
          <th>05</th>
          <th>06</th>
          <th>07</th>
          <th>08</th>
          <th>09</th>
          <th>10</th>
          <th>11</th>
          <th>12</th>
        </tr>
        <tr class="well">
          <th>A</th> {/* Row A */}
          <td class="well">{A01}</td>
          <td>{A02}</td>
          <td>{A03}</td>
          <td>{A04}</td>
          <td>{A05}</td>
          <td>{A06}</td>
          <td>{A07}</td>
          <td>{A08}</td>
          <td>{A09}</td>
          <td>{A10}</td>
          <td>{A11}</td>
          <td>{A12}</td>
        </tr>
        <tr class="well"> 
          <th>B</th> {/* Row B */}
          <td>{B01}</td>
          <td>{B02}</td>
          <td>{B03}</td>
          <td>{B04}</td>
          <td>{B05}</td>
          <td>{B06}</td>
          <td>{B07}</td>
          <td>{B08}</td>
          <td>{B09}</td>
          <td>{B10}</td>
          <td>{B11}</td>
          <td>{B12}</td>
        </tr>
        <tr class="well">
          <th>C</th> {/* Row C */}
          <td>{C01}</td>
          <td>{C02}</td>
          <td>{C03}</td>
          <td>{C04}</td>
          <td>{C05}</td>
          <td>{C06}</td>
          <td>{C07}</td>
          <td>{C08}</td>
          <td>{C09}</td>
          <td>{C10}</td>
          <td>{C11}</td>
          <td>{C12}</td>
        </tr>
        <tr class="well">
          <th>D</th> {/* Row D */}
          <td>{D01}</td>
          <td>{D02}</td>
          <td>{D03}</td>
          <td>{D04}</td>
          <td>{D05}</td>
          <td>{D06}</td>
          <td>{D07}</td>
          <td>{D08}</td>
          <td>{D09}</td>
          <td>{D10}</td>
          <td>{D11}</td>
          <td>{D12}</td>
        </tr>
        <tr class="well">
          <th>E</th> {/* Row E */}
          <td>{E01}</td>
          <td>{E02}</td>
          <td>{E03}</td>
          <td>{E04}</td>
          <td>{E05}</td>
          <td>{E06}</td>
          <td>{E07}</td>
          <td>{E08}</td>
          <td>{E09}</td>
          <td>{E10}</td>
          <td>{E11}</td>
          <td>{E12}</td>
        </tr>
        <tr class="well">
          <th>F</th> {/* Row F */}
          <td>{F01}</td>
          <td>{F02}</td>
          <td>{F03}</td>
          <td>{F04}</td>
          <td>{F05}</td>
          <td>{F06}</td>
          <td>{F07}</td>
          <td>{F08}</td>
          <td>{F09}</td>
          <td>{F10}</td>
          <td>{F11}</td>
          <td>{F12}</td>
        </tr>
        <tr class="well">
          <th>G</th> {/* Row G */}
          <td>{G01}</td>
          <td>{G02}</td>
          <td>{G03}</td>
          <td>{G04}</td>
          <td>{G05}</td>
          <td>{G06}</td>
          <td>{G07}</td>
          <td>{G08}</td>
          <td>{G09}</td>
          <td>{G10}</td>
          <td>{G11}</td>
          <td>{G12}</td>
        </tr>
        <tr class="well">
          <th>H</th> {/* Row H */}
          <td>{H01}</td>
          <td>{H02}</td>
          <td>{H03}</td>
          <td>{H04}</td>
          <td>{H05}</td>
          <td>{H06}</td>
          <td>{H07}</td>
          <td>{H08}</td>
          <td>{H09}</td>
          <td>{H10}</td>
          <td>{H11}</td>
          <td>{H12}</td>
        </tr>
      </table>
    </article>)
  }
  
  

  export default Plate;