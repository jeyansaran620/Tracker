import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';

class ModCustomer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            cusName : '',
            cusMail : '',
            cusLoc : '',
            locError: '',
            fetchError: ''
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
                    cusName : json.name,
                    cusMail : json.mailId,
                    cusLoc : json.location
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'customer fetch Went Wrong !!!'
                });
            })
    }

    checkValid(str)
    {
        if(str.length < 3)
         {
             return false
         }
         return true
    }

    submitForm(e)
    {
        e.preventDefault();
        if ( !this.checkValid(this.state.cusLoc))
        {
        this.setState({
            locError : this.checkValid(this.state.cusLoc) ? '' : 'Provide a valid customer Location'
        });
        }
        else
        {
            const values = {
                location : this.state.cusLoc
            }
            const headers = {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}customers/${this.props.match.params.id}`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    console.log(json);
                    this.props.history.push(`/ViewCustomer/${this.props.match.params.id}`);
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Something Went Wrong !!!'
                    });
                })
        }
    }

    handleLocChange(event)
    {
        this.setState({
            cusLoc : event.target.value,
            locError : this.checkValid(event.target.value) ? '' : 'Provide a valid customer Location',
            fetchError: ''
        });
    }

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <h4 style={{color:"floralWhite",padding:"1.5rem"}}>Modify Customer</h4>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" ><h5>Name:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <h4>{this.state.cusName}</h4>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" ><h5>E-Mail:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                        <h4>{this.state.cusMail}</h4>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="cusLoc" ><h5>Location:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="cusLoc" placeholder="Update Location"
                                value={this.state.cusLoc} onChange={(e) => this.handleLocChange(e)} />
                            <FormText>
                                {this.state.locError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.locError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                        <div className="col-4 offset-7">
                            <Button
                                type = "submit" onClick={(e) => this.submitForm(e)}>Update Customer</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

ModCustomer.propTypes = {
    history: propTypes.object,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

  
export default withRouter(ModCustomer);