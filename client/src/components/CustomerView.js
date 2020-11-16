import React from 'react';
import propTypes from 'prop-types';
import { hostname } from '../hostname';

class CustomerView extends React.Component
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

render()
{
    const {fetchError, customer } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"floralWhite"}}>{fetchError}</h3>
    )}
    else if(customer === null)
    {
        return (
             <h3 style={{color:"floralWhite"}}>Loading</h3>
        )
    }
    else
    {
        return(
            <div className="container" >
                <div className="row p-2">
                    <div>Customer Name: {customer.name}</div>
                </div>
                <div className="row p-2" >
                    <div>Customer Id: {customer._id}</div>
                </div>
                <div className="row p-2">
                    <div>Mail Id: {customer.mailId}</div>
                </div>
                <div className="row p-2">
                    <div>Location: {customer.location}</div>
                </div>
            </div>
        )
    }
}
}

CustomerView.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

  
export default CustomerView;