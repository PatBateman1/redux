const defaultState = {
    currTodo: '',
    todoList: [
        '吃饭',
        '睡觉',
        '打豆豆',
    ],
};

export const reducer = (state = defaultState, action) => {
    switch (action?.type) {
        case 'CHANGE':
            return {
                ...state,
                currTodo: action.value,
            };
        case 'ADD':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    state.currTodo,
                ],
            };
        case 'DELETE':
            const newList = [...state.todoList];
            newList.splice(action.index, 1);
            return {
                todoList: newList,
            };
        default:
            return state;
    }
};
