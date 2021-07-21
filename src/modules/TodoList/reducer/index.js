const defaultState = {
    todoList: [
        '吃饭',
        '睡觉',
        '打豆豆',
    ],
};

export const reducer = (state = defaultState, action) => {
    switch (action?.type) {
        case 'ADD':
            return {
                todoList: [
                    ...state.todoList,
                    action?.task,
                ],
            };
        case 'DELETE':
            return {
                todoList: [...state.todoList].splice(action.index, 1),
            };
        default:
            return state;
    }
};
