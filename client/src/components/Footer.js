import React from 'react';
import { Link } from 'react-router-dom';

const  Items = [ 
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


const Footer = () =>{
    return ( 
        <div className="footer">
            <div className="container">       
                <div  className="row justify-content-center"> 
                    <div className="col-12">
                        <div className="row justify-content-center">   
                            {
                                Items.map((item, i) => {
                                    return(
                                        <div key={i} className="m-2">
                                            <Link to={`/${item.link}`}><span className={`fa fa-${item.icon} fa-md`}></span> {item.content}</Link>
                                        </div>  
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>  
                <div className="row justify-content-center">             
                    <div className="col-auto m-0 mt-2">
                        <p>Designed by <a href="https://www.linkedin.com/in/jeyansaran620">jeyansaran620</a></p>
                    </div>
                </div>
            </div>
        </div>     
    );
};


export default Footer;
