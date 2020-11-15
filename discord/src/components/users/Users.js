import React from 'react';
import './Users.css';
import AddIcon from '@material-ui/icons/Add';

function Users() {
    return (
        <div className="users">
            <div className="me">
                <h5>ME</h5>
            </div>
            <div className="user"></div>
            <div className="user"></div>
            <div className="user"></div>
            <div className="user"></div>
            <div className="add">
                <AddIcon />
            </div>
                
        </div>
    )
}

export default Users
