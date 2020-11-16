import React from 'react';
import {Jumbotron} from 'reactstrap';
import Search from './Search';


const Home = () =>
{
    return(
        <div>
        <Jumbotron>
        <div className="container">
            <div className="row row-header">
                <div className="col-12 col-md-8">
                    <h2>Tool Tracker</h2>
                    <p>An Enthusiastic Learner who wants to explore in all the aspects of updating his knowledge and experience to the very next level, Currently working towards Full stack (MERN) Development.</p>
                </div>
            </div>
        </div>
        </Jumbotron>
        <Search />
        </div>
    )
}

export default Home;