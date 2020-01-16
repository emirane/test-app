import React from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
      this.state={
        data:[]
      }
      this.domain = `http://bio.jinr.ru:8444/api/mysql`;
      this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbiI6InVpZD1lbWlyYW5lLGNuPXVzZXJzLGNuPWFjY291bnRzLGRjPWh5YnJpbGl0LGRjPWppbnIsZGM9cnUiLCJpcGFVbmlxdWVJRCI6IjFlMGRlZmRjLTU5ZDctMTFlOS04M2I5LTUyNTQwMDhiMjllOCIsImtyYlByaW5jaXBhbE5hbWUiOiJlbWlyYW5lQEhZQlJJTElULkpJTlIuUlUiLCJ1aWQiOiJlbWlyYW5lIiwiZGlzcGxheU5hbWUiOiJEbWl0cml5IE1hcm92IiwibWFpbCI6ImRtaXRyaXkubWFyb3Y5N0B5YW5kZXgucnUiLCJ1aWROdW1iZXIiOiIxMTY2OCIsImdpZE51bWJlciI6IjEwMDAxIiwiZ3JvdXBzIjpbImh5YnJpbGl0IiwibGl0IiwiaGxpdC13ZWItYWRtaW4iLCJzY2hvb2wtaXQtMjAxOSIsImJpby1obGl0Il0sImxvZ2luU2hlbGwiOiIvYmluL2Jhc2giLCJob21lRGlyZWN0b3J5IjoiL3pmcy9oeWJyaWxpdC5qaW5yLnJ1L3VzZXIvZS9lbWlyYW5lIiwia3JiUGFzc3dvcmRFeHBpcmF0aW9uIjoiMjAyOS0wNC0wNVQwODo0MzowOC4wMDBaIiwia3JiTGFzdFB3ZENoYW5nZSI6IjIwMTktMDQtMDhUMDg6NDM6MDguMDAwWiIsImlzQWRtaW4iOnRydWUsImlzQ2hpZWYiOmZhbHNlLCJpYXQiOjE1NzkxMDk1MDksImV4cCI6MTU3OTE5NTkwOX0.GWs7-JUGNdjeVVQUsOx-B6JeLTBN8t6VMmXmxClJAbM"
      this.onAfterInsertRow = this.onAfterInsertRow.bind(this);
    }

    componentDidMount() {
      this.getExperiments();
    }

    /* ------------------------ API Methods ------------------------------- */

    // Get experimets data from db
    getExperiments () {
        axios.defaults.headers.common['Authorization'] = "secret " + this.token;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'POST',
            url:`${this.domain}/getExps`,
            data: {}
        })        
        .then(({ data }) => {
            this.setState({
              data: data
            });
            console.log(this.state.data);
        });
    }

    addExperiment (createDate, creator, desc, expName, impact) {
      //axios.defaults.headers.common['Authorization'] = "secret "+localStorage.getItem('currentUser');
      //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios({
          method: 'POST',
          url:`${this.domain}/addExp`,
          data: {
              createDate,
              creator,
              desc,
              expName,
              impact
          }
        })        
        .then(({ response }) => {
          this.getExperiments();
          this.setState({
              added:true
          })
        });
  }

     // Handle after add new exp
     onAfterInsertRow (row) {
       //console.log(row)
      const author = 'author';
      var d = new Date(),
      finalDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
      //console.log(finalDate); 
      this.addExperiment(finalDate,author,row.expDescription, row.expName, row.expImpact);
  }

    // Redirect to selected exp
    onRowClick (row, rowIdx)  {
      const _id = row.expID 
      this.props.history.push({
        pathname: `/exp/${_id}`,
          state: {exp: row}  
      })   
    }

    // custom button GROUPS
    buttonExpandRow (cell, row) {   
      return (
      <label>
        <button type="button" 
          onClick={() => {this.onRowClick(row)}} 
      >
        Groups
        </button>
      </label>)
    }

  render() {
      const options = {
        afterInsertRow: this.onAfterInsertRow,
        defaultSortName: 'expCreationDate',
        defaultSortOrder: 'desc',
        sortIndicator: true, 
      }
      return (
        <div>
            Hello, my first react app!
            <BootstrapTable data={this.state.data} options={options} insertRow={ true } containerClass='experiments__table'>
              <TableHeaderColumn hiddenOnInsert dataField="button" width='130px' dataAlign='center' dataFormat={this.buttonExpandRow.bind(this)}>Active</TableHeaderColumn>
              <TableHeaderColumn isKey dataField='expID' hidden hiddenOnInsert autoValue dataSort={ true }>expID</TableHeaderColumn>
              <TableHeaderColumn dataField='expName'dataSort dataAlign='center' >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='expCreationDate' hiddenOnInsert dataAlign='center' autoValue dataSort>Creation date</TableHeaderColumn>
              <TableHeaderColumn dataField='expCreator' dataAlign='center' width='140px' hiddenOnInsert autoValue dataSort>Creator</TableHeaderColumn>
              <TableHeaderColumn dataField='expDescription' dataSort>expDescription</TableHeaderColumn>
              <TableHeaderColumn dataField='expImpact' dataSort width='140px'>Impact</TableHeaderColumn>
            </BootstrapTable>
        </div>
      )
    }

}



export default App;
