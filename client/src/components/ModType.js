import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';

class ViewType extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            typeName : '',
            typeDesc: '',
            descError: '',
            fetchError: ''
        };

    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}types/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    typeName : json.name,
                    typeDesc : json.description
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
        if ( !this.checkValid(this.state.typeDesc))
        {
        this.setState({
            descError : this.checkValid(this.state.typeDesc) ? '' : 'Provide a valid type Description' 
        });
        }
        else
        {
            const values = {
                description : this.state.typeDesc
            }
            const headers = {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}types/${this.props.match.params.id}`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    console.log(json);
                    this.props.history.push(`/ViewType/${this.props.match.params.id}`);
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Something Went Wrong !!!'
                    });
                })
        }
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
                    <h4 style={{color:"floralWhite",padding:"1.5rem"}}>Modify Type</h4>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" ><h5>Name:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <h4>{this.state.typeName}</h4>
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
                            <Button
                                type = "submit" onClick={(e) => this.submitForm(e)}>Modify Type</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

ViewType.propTypes = {
    history: propTypes.object,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

  
export default withRouter(ViewType);