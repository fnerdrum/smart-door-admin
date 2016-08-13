import React from 'react';
import axios from 'axios';
import Users from './Users';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [], entries: []};

        this.addUser = this.addUser.bind(this);
    }

    componentDidMount() {
        axios.get('/users')
            .then(response => this.setState({users: response.data}))
            .catch(error => console.error(error));
        axios.get('/entries')
            .then(response => this.setState({entries: response.data}))
            .catch(error => console.error(error));
    }

    addUser(name) {
        axios.post('/users', {name})
            .then(response => this.setState({users: this.state.users.concat(response.data)}))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <Users users={this.state.users} add={this.addUser}/>
            </div>
        );
    }
}

export default App;