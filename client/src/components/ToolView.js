import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';

class ToolView extends React.Component
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

render()
{
    const {fetchError, tool } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"floralWhite"}}>{fetchError}</h3>
    )}
    else if(tool === null)
    {
        return (
             <h3 style={{color:"floralWhite"}}>Loading</h3>
        )
    }
    else
    {
        return(
            <div className="container" >
                <div className="row p-2" >
                    <div>Tool Id: {tool._id}</div>
                </div>
                <div className="row p-2">
                    <div>Defects: {tool.defects}</div>
                </div>
                <div className="row p-2">
                    <div>Available: {tool.available.toString()}</div>
                </div>
                <div className="row p-2">
                    <div>Created on: {tool.createdAt.slice(0,10)}</div>
                </div>
                <div className="row p-2">
                    <div className="container" >
                    <div className="row">Rental History:</div>
                    <div className="row">
                    {
                    tool.rentals.length === 0 ? <h5>No Rentals by now</h5>
                    :
                     tool.rentals.reverse().map((rent,i) =>{
                         return(
                              <Card body outline color="secondary" key ={i} className="col-5 m-2">
                                    <CardTitle tag="h5">{rent.customer}</CardTitle>
                                    <CardText>
                                        <div>Date Taken: {rent.dateTaken.slice(0,10)}</div>
                                        <div>Expected Return: {rent.dateToBeReturned.slice(0,10)}</div>
                                        {rent.dateReturned ? 
                                        <div>Date Returned: {rent.dateReturned.slice(0,10)}</div>:
                                        null
                                    }
                                    </CardText>
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
            </div>
        )
    }
}
}

ToolView.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    }),
    history: propTypes.object
  };

  
export default withRouter(ToolView);