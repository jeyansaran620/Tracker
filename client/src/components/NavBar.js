import React from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,} from 'reactstrap';
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import auth from "./auth";
import propTypes from 'prop-types';

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
        auth.logout(() => {
            this.props.history.push("/Login");
          });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    RenderList()
    {
        return (   
            <Nav navbar className="ml-auto">
                {
                    this.Items.map((item, i) => {
                        return(
                            <NavItem key={i} className="m-1">
                                <NavLink className="nav-link" to={`/${item.link}`}><span className={`fa fa-${item.icon} fa-md`}></span>  {item.content}</NavLink>
                            </NavItem>  
                        );
                    })
                }
                { auth.isAuthenticated() ? 
                 <NavItem className="m-1">
                    <div className="nav-link" onClick={() => this.logout()}><span className={`fa fa-sign-out fa-md`}></span> Logout</div>
                 </NavItem> : null
                }
            </Nav>   
        ); 
    }

    render(){
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" onClick={() =>  this.props.history.push("/Home")} >Tool Tracker</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            {this.RenderList()}
                        </Collapse>
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
