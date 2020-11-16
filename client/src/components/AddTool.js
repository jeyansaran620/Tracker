import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';
import Select from 'react-select';
import { customStyles } from './react-select-style';

class AddTool extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            types : [],
            typeName : {},
            toolDef: 'Nothing',
            nameError:'',
            defError: '',
            fetchError: ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}types/`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                let types = [];
                json.map((type) => types.push(
                    {
                        label : type.name,
                        value:type._id
                    }));
                this.setState({
                    types
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'Something Went Wrong !!!'
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
       
        if (!this.state.typeName.value  || !this.checkValid(this.state.toolDef))
        {
        this.setState({
            nameError : this.state.typeName.value ? '' : 'Please Select a type',
            defError : this.checkValid(this.state.toolDef) ? '' : 'Provide a valid type Description' 
        });
        }
        else
        {
            const values = {
                type : this.state.typeName.value,
                defects : this.state.toolDef
            }
            const headers = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}tools`, headers)
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
            typeName : name,
            fetchError: ''
        });
    }

    handleDefChange(event)
    {
        this.setState({
            toolDef: event.target.value,
            defError : this.checkValid(event.target.value) ? '' : 'Provide Defects or Nothing',
            fetchError: ''
        });
    }

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="toolType" ><h5>Type:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                        <Select options={this.state.types}
                         style={{height:"2rem"}} id="toolType" placeholder="Select Type"  styles={customStyles}
                                value={this.state.typeName} onChange={(e) => this.handleNameChange(e)} />
                            <FormText>
                                {this.state.nameError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="toolDef" ><h5>Defects:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="toolDef" placeholder="Add Tool defects"
                                value={this.state.toolDef} onChange={(e) => this.handleDefChange(e)} />
                            <FormText>
                                {this.state.defError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.defError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                      <div className="col-4 offset-1">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                onClick={() => this.props.history.push("/AddType")}>Add Type</Button>
                        </div>
                        <div className="col-4 offset-2">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Add Tool</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

AddTool.propTypes = {
    history: propTypes.object
};

export default withRouter(AddTool);