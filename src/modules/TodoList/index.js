import React, { Component } from 'react';
import store from './store/index';
import actionCreater from './actions/index'

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.listener = this.listener.bind(this);
        store.subscribe(this.listener);
    }

    changeValue (e) {
        store.dispatch(actionCreater('CHANGE', { value: e.target.value }));
    }

    submitEvent () {
        store.dispatch(actionCreater('ADD', {}));
        store.dispatch(actionCreater('CHANGE', { value: '' }));
    }

    deleteEvent (index) {
        store.dispatch(actionCreater('DELETE', { index }));
    }

    listener () {
        const newState = store.getState();
        this.setState(newState);
    }

    render () {
        return (
            <div>
                <input
                    onChange={this.changeValue}
                    value={this.state.currTodo}
                />
                <button onClick={this.submitEvent}>提交</button>
                <div>
                    {
                        this.state.todoList.map((item, index) => {
                            return (
                                <div onClick={this.deleteEvent.bind(this, index)} key={index}>
                                    {item}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default TodoList;
