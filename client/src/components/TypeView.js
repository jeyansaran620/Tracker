import React from 'react';
import { Card, Button, CardTitle } from 'reactstrap';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';

class TypeView extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            fetchError : ''
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
                    type : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'type fetch Went Wrong !!!'
                });
            })
        }

render()
{
    const {fetchError, type } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"floralWhite"}}>{fetchError}</h3>
    )}
    else if(type === null)
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
                    <div>Type Name: {type.name}</div>
                </div>
                <div className="row p-2" >
                    <div>Type Id: {type._id}</div>
                </div>
                <div className="row p-2">
                    <div>Description: {type.description}</div>
                </div>
                <div className="row p-2">
                    <div className="container">
                    <div className="row">Tools in this Type:</div>
                    <div className="row">
                    {
                    type.tools.length === 0 ? <h5>No Tools by now</h5>
                    :
                     type.tools.reverse().map((tool,i) =>{
                         return(
                              <Card body outline color="secondary" key ={i} className="col-5 m-2">
                                    <CardTitle tag="h5">{tool}</CardTitle>
                                    <Button onClick={() =>  this.props.history.push(`/ToolView/${tool}`)} >View Tool</Button>
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

TypeView.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    }),
    history: propTypes.object
  };

  
export default withRouter(TypeView);