import React from 'react';
import { hostname } from '../../hostname';
import propTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Card, Button, CardTitle } from 'reactstrap';

class OpenHome extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Types: null,
            TypeSearch : '',
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}types/list`, headers)
        .then(response => response.json())
        .then(json => 
            {
                this.setState({
                    Types : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'types fetch Went Wrong !!!'
                });
            })
    }

    onTypeSearchChange(e)
    {
        this.setState({
            TypeSearch : e.target.value
        })
    }

    render()
    {
        const {fetchError,Types, TypeSearch } = this.state;

        if (fetchError !== '')
        {
          return(
              <div>
            <h3 style={{color:"#DE9E48",textAlign:"center"}}>{fetchError}</h3>
            <div className="NewBox"></div>
            </div>
        )}

        else if(Types === null)
        {
            return (
                    <h3 style={{color:"#DE9E48",textAlign:"center"}}>Loading</h3>
            )
        }
        else
        {
            const searchedTypes = Types.filter((type) => type.name.toLowerCase().includes(TypeSearch.toLowerCase()));
            return(
            <div className="container">
              
            <div className="row m-2">
                <div className="col-4 p-2 h6">
                Search Types
                </div>
                <div className="col-6 p-2">
                <input value={TypeSearch} onChange={(e) => this.onTypeSearchChange(e)} placeholder="search"/>
                </div>
                </div>
                <div className="row m-2 mb-4">
                {searchedTypes.length === 0 ?
                 <div>No Type Found</div> :
                 searchedTypes.map((type,i) =>
                 {
                 return(
                 <Card body outline color="secondary" key ={i} className="col-11 col-sm-5 m-1">
                 <CardTitle tag="h5">{type.name}</CardTitle>
                 <Button onClick={() =>  this.props.history.push(`/ViewType/${type._id}`)} >View Type</Button>
             </Card>
                 )}
                  )
                }
            </div>
            <Button onClick={() =>  this.props.history.push(`/AddType`)} >Add Type</Button>
            
            </div>
        )
    } 
  }
}


OpenHome.propTypes = {
    history: propTypes.object
};

export default withRouter(OpenHome);