import React from 'react';
import { Card, Button, CardTitle } from 'reactstrap';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';

class ViewTool extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tool: null,
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}tools/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    tool : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'tool fetch Went Wrong !!!'
                });
            })
    }

    deleteTool()
    {
        const headers = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch( `${hostname}tools/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                this.props.history.push(`/Home`);
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'tool delete Went Wrong !!!'
                });
            })
    }

render()
{
    const {fetchError, tool } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"#DE9E48",textAlign:"center"}}>{fetchError}</h3>
    )}
    else if(tool === null)
    {
        return (
             <h3 style={{color:"#DE9E48",textAlign:"center"}}>Loading</h3>
        )
    }
    else
    {
        return(
            <div className="container" >
                <div className="row p-2">
                <h4 className="col-5 m-1" >Tool Details</h4>
                <Button className="col-5 m-1"
                        onClick={() => this.props.history.push(`/AddTool`)}>Add Tool</Button>
                </div>

                <Card body outline color="secondary" className="col-10 m-1">
                           
                <div className="row p-2 m-1">Tool Id: {tool._id}</div>

                <div className="row p-2 m-1">Defects: {tool.defects}</div>
                
                <div className="row p-2 m-1">Available: {tool.available.toString()}</div>

                <div className="row p-2 m-1">Created on: {tool.createdAt.slice(0,10)}</div>
                
                <div className="row p-2" >
                <Button className="col-5 m-1"
                        onClick={() =>  this.props.history.push(`/AddRent`)}>Rent Tool</Button>
                
                <Button className="col-5 m-1"
                        onClick={() =>  this.props.history.push(`/ViewType/${tool.type}`)}>View Type</Button>
                </div>
                
                <div className="row p-2">
                <Button className="col-5 m-1"
                        onClick={() =>  this.props.history.push(`/ModTool/${this.props.match.params.id}`)}>Modify Details</Button>

                <Button className="col-5 m-1"
                        onClick={() => this.deleteTool()}>Delete Tool</Button>
                </div>

                <div className="row p-2">
                    <div className="container" >
                    <div className="row m-1">Rental History:</div>
                    <div className="row m-1">
                    {
                    tool.rentals.length === 0 ? <h5>No Rentals by now</h5>
                    :
                     tool.rentals.reverse().map((rent,i) =>{
                         return(
                              <Card body outline color="secondary" key ={i} className="col-11 col-sm-5 m-2">
                                    <CardTitle tag="h5">{rent.customer}</CardTitle>
                                        <div>Date Taken: {rent.dateTaken.slice(0,10)}</div>
                                        <div>Expected Return: {rent.dateToBeReturned.slice(0,10)}</div>
                                        {rent.dateReturned ? 
                                        <div>Date Returned: {rent.dateReturned.slice(0,10)}</div>:
                                        null
                                    }
                                    {rent.dateReturned ? 
                                        null:
                                        <Button onClick={() =>  this.props.history.push("/CloseRent")} >Close Rent</Button>
                                    }
                                </Card>
                        )})
                    }
                    </div>
                    </div> 

                </div>
                </Card>
               
            </div>
        )
    }
}
}

ViewTool.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    }),
    history: propTypes.object
  };

  
export default withRouter(ViewTool);