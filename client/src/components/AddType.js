import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';

class AddType extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            typeName : '',
            typeDesc: '',
            nameError:'',
            descError: '',
            fetchError: ''
        };

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
        if (!this.checkValid(this.state.typeName)  || !this.checkValid(this.state.typeDesc))
        {
        this.setState({
            nameError : this.checkValid(this.state.typeName) ? '' : 'Provide a valid type Name',
            descError : this.checkValid(this.state.typeDesc) ? '' : 'Provide a valid type Description' 
        });
        }
        else
        {
            const values = {
                name : this.state.typeName,
                description : this.state.typeDesc
            }
            const headers = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}types`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    console.log(json);
                    this.props.history.push("/Home");
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Something Went Wrong !!!'
                    });
                })
        }
    }

    handleNameChange(event)
    {
        this.setState({
            typeName : event.target.value,
            nameError : this.checkValid(event.target.value) ? '' : 'Provide a valid Name',
            fetchError: ''
        });
    }

    handleDescChange(event)
    {
        this.setState({
            typeDesc: event.target.value,
            descError : this.checkValid(event.target.value) ? '' : 'Provide a valid Description',
            fetchError: ''
        });
    }

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="typeName" ><h5>Name:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="typeName" placeholder="Give Type Name"
                                value={this.state.typeName} onChange={(e) => this.handleNameChange(e)} />
                            <FormText>
                                {this.state.nameError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="typeDesc" ><h5>Description:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="typeDesc" placeholder="Give Type Description"
                                value={this.state.typeDesc} onChange={(e) => this.handleDescChange(e)} />
                            <FormText>
                                {this.state.descError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.descError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                        <div className="col-4 offset-7">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Add Type</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

AddType.propTypes = {
    history: propTypes.object
};

export default withRouter(AddType);