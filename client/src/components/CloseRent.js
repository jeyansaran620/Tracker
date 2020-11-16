import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';
import Select from 'react-select';
import { customStyles } from './react-select-style';

class CloseRent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tools : [],
            toolName : {},
            dateReturned: '',
            nameError:'',
            dateError: '',
            fetchError: ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}tools/rented`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                let tools = [];
                json.map((tool) => tools.push(
                    {
                        label : tool._id,
                        value : tool._id
                    }));
                this.setState({
                    tools
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'tools fetch Went Wrong !!!'
                });
            })
    }

    submitForm(e)
    {
        e.preventDefault();
       
        if (!this.state.toolName.value || this.state.dateReturned === '')
        {
        this.setState({
            nameError : this.state.typeName.value ? '' : 'Please Select a type',
            dateError : this.state.dateReturned === '' ? 'Please Provide the Date' : ''
        });
        }
        else
        {
            const values = {
                dateReturned : this.state.dateReturned

            }
            const headers = {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };
            
            fetch( `${hostname}tools/${this.state.toolName.value}/rentals/`, headers)
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

    handleNameChange(name)
    {
        this.setState({
            nameError : '',
            toolName : name,
            fetchError: ''
        });
    }

    handleDateChange(event)
    {
        this.setState({
            dateReturned: event.target.value,
            fetchError: ''
        });
    }
    

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="toolName" ><h5>Tool:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                        <Select options={this.state.tools}
                         style={{height:"2rem"}} id="toolName" placeholder="Select Type"  styles={customStyles}
                                value={this.state.toolName} onChange={(e) => this.handleNameChange(e)} />
                            <FormText>
                                {this.state.nameError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="dateReturned" ><h5>Date Returned:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="date" style={{height:"2rem"}} id="dateReturned"
                                value={this.state.dateReturned} onChange={(e) => this.handleDateChange(e)} />
                            <FormText>
                                {this.state.dateError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.dateError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                      <div className="col-4 offset-1">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                onClick={() => this.props.history.push("/AddRent")}>Add Rent</Button>
                        </div>
                        <div className="col-4 offset-2">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Close Rent</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

CloseRent.propTypes = {
    history: propTypes.object
};

export default withRouter(CloseRent);