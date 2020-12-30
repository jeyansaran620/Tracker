import React from 'react';
import { Card } from 'reactstrap';
import propTypes from 'prop-types';
import { hostname } from '../../hostname';
import { withRouter } from 'react-router-dom';

class OpenViewType extends React.Component
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

    deleteType()
    {
        const headers = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch( `${hostname}types/${this.props.match.params.id}`, headers)
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
    const {fetchError, type } = this.state;
    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"#DE9E48",textAlign:"center"}}>{fetchError}</h3>
    )}
    else if(type === null)
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
                <h4 className="col-5 m-1" >Type Details</h4>
                </div>
                <Card body outline color="secondary" className="col-10 m-1">

                <div className="row p-2 m-1">Type Name: {type.name}</div>   
                
                <div className="row p-2 m-1">Description: {type.description}</div>

                <div className="row p-2">
                    <div className="container">
                    <div className="row m-1">Tools available this Type: {type.tools.length}
                    </div>
                    </div>    

                </div>
                </Card>
            </div>
        )
    }
}
}

OpenViewType.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    }),
    history: propTypes.object
  };

  
export default withRouter(OpenViewType);