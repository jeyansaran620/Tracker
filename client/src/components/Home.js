import React from 'react';
import { hostname } from '../hostname';
import propTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Card, Button, CardTitle } from 'reactstrap';

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Customers: null,
            Types: null,
            Tools : null,
            CusSearch : '',
            TypeSearch : '',
            ToolSearch : '',
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}tools/list`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json)
               this.setState({
                    Tools : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'tools fetch Went Wrong !!!'
                });
            })

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

        fetch( `${hostname}customers/list`, headers)
        .then(response => response.json())
        .then(json => 
            {
                this.setState({
                    Customers : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'customers fetch Went Wrong !!!'
                });
            })
    }

    onTypeSearchChange(e)
    {
        this.setState({
            TypeSearch : e.target.value
        })
    }

    onCusSearchChange(e)
    {
        this.setState({
            CusSearch : e.target.value
        })
    }

    onToolSearchChange(e)
    {
        this.setState({
            ToolSearch : e.target.value
        })
    }

    render()
    {
        const {fetchError,Types, Tools, Customers, ToolSearch, CusSearch, TypeSearch } = this.state;

        if (fetchError !== '')
        {
          return(
            <h3 style={{color:"#DE9E48",textAlign:"center"}}>{fetchError}</h3>
        )}

        else if(Customers === null || Types === null || Tools === null)
        {
            return (
                    <h3 style={{color:"#DE9E48",textAlign:"center"}}>Loading</h3>
            )
        }
        else
        {
            const searchedTypes = Types.filter((type) => type.name.toLowerCase().includes(TypeSearch.toLowerCase()));
            const searchedCustomers = Customers.filter((cus) => cus.mailId.toLowerCase().includes(CusSearch.toLowerCase()));
            const searchedTools = Tools.filter((tool) => tool._id.toLowerCase().includes(ToolSearch.toLowerCase()));
        
            return(
            <div className="container">
                <div className="row m-2">
                <div className="col-4 p-2 h6">
                Search Customers
                </div>
                <div className="col-6 p-2">
                <input value={CusSearch} onChange={(e) => this.onCusSearchChange(e)} placeholder="search"/>
                </div>
                </div>
                <div className="row m-2 mb-4">
                {searchedCustomers.length === 0 ?
                 <div>No Customer Found</div> :
                 searchedCustomers.map((cus,i) =>
                 {
                 return(
                 <Card body outline color="secondary" key ={i} className="col-11 col-sm-5 m-1">
                 <CardTitle tag="h5">{cus.mailId}</CardTitle>
                 <Button onClick={() =>  this.props.history.push(`/ViewCustomer/${cus._id}`)} >View Customer</Button>
             </Card>
                 )}
                  )
                }
            </div>
            <Button onClick={() =>  this.props.history.push(`/AddCustomer`)} >Add Customer</Button>
            
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
            
               <div className="row m-2">
                <div className="col-4 p-2 h6">
                Search Tools
                </div>
                <div className="col-6 p-2">
                <input value={ToolSearch} onChange={(e) => this.onToolSearchChange(e)} placeholder="search"/>
                </div>
                </div>
                <div className="row m-2 mb-4">
                {searchedTools.length === 0 ?
                 <div>No Tool Found</div> :
                 searchedTools.map((tool,i) =>
                 {
                 return(
                 <Card body outline color="secondary" key ={i} className="col-11 col-sm-5 m-1">
                 <CardTitle tag="h5">{tool._id}</CardTitle>
                 <Button onClick={() =>  this.props.history.push(`/ViewTool/${tool._id}`)} >View Tool</Button>
             </Card>
                 )}
                  )
                }
            </div>
            <Button onClick={() =>  this.props.history.push(`/AddTool`)} >Add Tool</Button>

            </div>
        )
    } 
  }
}


Home.propTypes = {
    history: propTypes.object
};

export default withRouter(Home);