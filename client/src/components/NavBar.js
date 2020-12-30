import React from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,} from 'reactstrap';
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import auth from "./auth";
import propTypes from 'prop-types';
import {hostname} from '../hostname';

class NavBar extends React.Component{
  
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
   
        this.Items = [ 
            {
                content:"New Customer",
                link:"AddCustomer",
                icon:"user"
            },
            {
                content:"New Type",
                link:"AddType",
                icon:"qrcode"
            },
            {
                content:"New Tool",
                link:"AddTool",
                icon:"gear"
            },
            {
                content:"New Rental",
                link:"AddRent",
                icon:"plus-square"
            },
            {
                content:"Close Rental",
                link:"CloseRent",
                icon:"minus-square"
            }
        ];
    }
   
    logout()
    {
        const headers = {
            method:'GET', 
            credentials: 'include'
        }

        fetch( `${hostname}logout`, headers)
        .then(response => response.json())
        .then(json => 
            {
                if(json.logout)
                {
                    auth.logout(() => {
                        this.props.history.push("/Home");
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    RenderList()
    {
        return (  
                <>
                { auth.isAuthenticated() ?
                <> 
                <NavbarToggler onClick={this.toggleNav} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar className="ml-auto">
                {
                    this.Items.map((item, i) => {
                        return(
                            <NavItem key={i} className="m-1">
                                <NavLink className="nav-link linker" to={`/${item.link}`}><span className={`fa fa-${item.icon} fa-md`}></span>  {item.content}</NavLink>
                            </NavItem>  
                        );
                    })
                }
                 <NavItem className="m-1">
                    <div className="nav-link linker" onClick={() => this.logout()}><span className={`fa fa-sign-out fa-md`}></span> Logout</div>
                 </NavItem>
                 </Nav>
                 </Collapse>
                 </>
                  :
                  <Nav navbar className="ml-auto"> 
                  <NavItem className="m-1">
                      <NavLink className="nav-link linker" to={`/Login`}><span className={`fa fa-sign-in fa-md`}></span> Login</NavLink>
                 </NavItem> 
                 </Nav>
                }
               </>
        ); 
    }

    render(){
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto linker navbarbrand" onClick={() =>  this.props.history.push("/Home")} >Tool Tracker</NavbarBrand>
                       
                            {this.RenderList()}
                      
                    </div>
                </Navbar>
            </>
        );
    }
}

NavBar.propTypes = {
    history: propTypes.object
  };

export default withRouter(NavBar);
