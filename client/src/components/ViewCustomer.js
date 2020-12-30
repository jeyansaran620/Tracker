import React from 'react';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';
import {  Button ,Card } from 'reactstrap';

class ViewCustomer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}customers/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    customer : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'customer fetch Went Wrong !!!'
                });
            })
    }

    deleteCus()
    {
        const headers = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch( `${hostname}customers/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                this.props.history.push(`/Home`);
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'type delete Went Wrong !!!'
                });
            })
    }

render()
{
    const {fetchError, customer } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"#DE9E48",textAlign:"center"}}>{fetchError}</h3>
    )}
    else if(customer === null)
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
                <h4 className="col-5 m-1" >Customer Details</h4>
                <Button className="col-5 m-1"
                        onClick={() => this.props.history.push(`/AddCustomer`)}>Add Customer</Button>
                </div>
                <Card body outline color="secondary" className="col-10 m-1">
               
                <div className="row p-2 m-1">Customer Name: {customer.name}</div>

                <div className="row p-2 m-1">Customer Id: {customer._id}</div>

                <div className="row p-2 m-1">Mail Id: {customer.mailId}</div>

                <div className="row p-2 m-1">Location: {customer.location}</div>
                
                <div className="row p-2">
                <Button  className="col-5 m-1"
                        onClick={() =>  this.props.history.push(`/ModCustomer/${this.props.match.params.id}`)}>Modify Details</Button>
            
                <Button className="col-5 m-1"
                        onClick={() => this.deleteCus()}>Delete Customer</Button>
                </div>
                </Card>
                </div>
        )
    }
}
}

ViewCustomer.propTypes = {
    history: propTypes.object,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

  
export default  withRouter(ViewCustomer);