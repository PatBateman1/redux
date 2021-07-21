import React, { Component } from 'react';
import store from './store/index';

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
    }

    changeValue () {
        console.log('change');
    }

    submitEvent () {
        console.log('submit');
    }

    deleteEvent () {
        console.log('delete');
    }

    render () {
        return (
            <div>
                <input
                    onChange={this.changeValue}
                />
                <button onClick={this.submitEvent}>提交</button>
                <div
                    onClick={this.deleteEvent}
                >npm</div>
            </div>
        );
    }
}

export default TodoList;
