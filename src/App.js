import React, { Component } from 'react';
import Home from './Home';
import './index.css';
import TokenDetailsHistory from './TokenDetailsHistory'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link className='nav-link' to="/">Home</Link>
                        </nav>
                     <Route path="/" exact component={Home} />
                     <Route path="/token-history/:token" component={TokenDetailsHistory} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
