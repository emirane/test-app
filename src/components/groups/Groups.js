import React from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Groups extends React.Component {
    constructor() {
        super()
        this.state={
            data:[]
          }
        this.domain = `http://bio.jinr.ru:8444/api/mysql`;
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbiI6InVpZD1lbWlyYW5lLGNuPXVzZXJzLGNuPWFjY291bnRzLGRjPWh5YnJpbGl0LGRjPWppbnIsZGM9cnUiLCJpcGFVbmlxdWVJRCI6IjFlMGRlZmRjLTU5ZDctMTFlOS04M2I5LTUyNTQwMDhiMjllOCIsImtyYlByaW5jaXBhbE5hbWUiOiJlbWlyYW5lQEhZQlJJTElULkpJTlIuUlUiLCJ1aWQiOiJlbWlyYW5lIiwiZGlzcGxheU5hbWUiOiJEbWl0cml5IE1hcm92IiwibWFpbCI6ImRtaXRyaXkubWFyb3Y5N0B5YW5kZXgucnUiLCJ1aWROdW1iZXIiOiIxMTY2OCIsImdpZE51bWJlciI6IjEwMDAxIiwiZ3JvdXBzIjpbImh5YnJpbGl0IiwibGl0IiwiaGxpdC13ZWItYWRtaW4iLCJzY2hvb2wtaXQtMjAxOSIsImJpby1obGl0Il0sImxvZ2luU2hlbGwiOiIvYmluL2Jhc2giLCJob21lRGlyZWN0b3J5IjoiL3pmcy9oeWJyaWxpdC5qaW5yLnJ1L3VzZXIvZS9lbWlyYW5lIiwia3JiUGFzc3dvcmRFeHBpcmF0aW9uIjoiMjAyOS0wNC0wNVQwODo0MzowOC4wMDBaIiwia3JiTGFzdFB3ZENoYW5nZSI6IjIwMTktMDQtMDhUMDg6NDM6MDguMDAwWiIsImlzQWRtaW4iOnRydWUsImlzQ2hpZWYiOmZhbHNlLCJpYXQiOjE1NzkxMDk1MDksImV4cCI6MTU3OTE5NTkwOX0.GWs7-JUGNdjeVVQUsOx-B6JeLTBN8t6VMmXmxClJAbM"
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups() {
        const expID = this.props.location.state.exp.expID;
        axios.defaults.headers.common['Authorization'] = "secret " + this.token;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'POST',
            url:`${this.domain}/getGrps`,
            data: {
                expID: expID
            }
        })        
        .then(({ data }) => {
            this.setState({
                data: data
            });
        console.log(this.state.data)
        });
    }

    render() {
        return(
            <div>
                {this.props.location.state.exp.expID}
                <BootstrapTable data={this.state.data} containerClass='groups__table'>
                    <TableHeaderColumn isKey dataField='groupID' hidden hiddenOnInsert autoValue dataSort={ true }>groupID</TableHeaderColumn>
                    <TableHeaderColumn dataField='groupName' width='160px' dataAlign='center' dataSort={ true }>groupName</TableHeaderColumn>
                    <TableHeaderColumn dataField='groupCreationDate' dataAlign='center' hiddenOnInsert autoValue dataSort={ true } dataFormat={this.dateFormatter}> groupCreationDate</TableHeaderColumn>
                    <TableHeaderColumn dataField='groupCreator' dataAlign='center' width='140px' hiddenOnInsert autoValue dataSort={ true }>groupCreator</TableHeaderColumn>
                    <TableHeaderColumn dataField='groupDescription' hidden dataSort={ true }>groupDescription</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Groups;