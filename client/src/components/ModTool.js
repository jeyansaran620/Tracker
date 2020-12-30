import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';

class ModTool extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            typeName : '',
            toolDef: 'Nothing',
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

      
        fetch( `${hostname}tools/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    typeName : json.type,
                    toolDef : json.defects
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'type fetch Went Wrong !!!'
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
       
        if (!this.checkValid(this.state.toolDef))
        {
        this.setState({
            defError : this.checkValid(this.state.toolDef) ? '' : 'Provide a valid type Description' 
        });
        }
        else
        {
            const values = {
                defects : this.state.toolDef
            }
            const headers = {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}tools/${this.props.match.params.id}`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    console.log(json);
                    this.props.history.push(`/Viewtool/${this.props.match.params.id}`);
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Something Went Wrong !!!'
                    });
                })
        }
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
                    <h4 style={{color:"floralWhite",padding:"1.5rem"}}>Modify Tool</h4>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="toolType" ><h5>Type:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <h4>{this.state.typeName}</h4>
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
                        <div className="col-4 offset-7">
                            <Button
                                type = "submit" onClick={(e) => this.submitForm(e)}>Modify Tool</Button>
                        </div>
                    </FormGroup>

                </Form>
            
            </div>
        );
    } 
}

ModTool.propTypes = {
    history: propTypes.object,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

export default withRouter(ModTool);