import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {entries: []};
    }

    componentDidMount() {
        axios.get('/entries')
            .then(response => this.setState({entries: response.data}))
            .catch(error => console.error(error));
    }

    render() {
        const {entries} = this.state;
        console.log('entries', entries);
        return (
            <h1>Hello, world!</h1>
        );
    }
}

export default App;