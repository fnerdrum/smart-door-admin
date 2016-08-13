import React from 'react';
import {findDOMNode} from 'react-dom';

export default class extends React.Component {
    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>
                    {this.props.users.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
                <form onSubmit={event => {
                    event.preventDefault();
                    const input = findDOMNode(this.refs.name);
                    this.props.add(input.value);
                    input.value = null;
                }}>
                    <input ref="name" type="text" placeholder="Name"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}