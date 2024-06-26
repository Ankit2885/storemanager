import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Store Manage</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-items">Add items</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/view-pay-later">View pay later</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/view-bill">View bill</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage">Manage items</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/fabric">Fabric page</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
