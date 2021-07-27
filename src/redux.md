## 1. redux介绍

    It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

    You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.

总结一下，redux是一个数据流框架，将视图层次与数据、逻辑分离开来，解决了复杂应用中数据与视图之间关系错综复杂以至于难以添加新功能以及维护的问题。



## 2. redux基础用法以及工作流程
![avatar](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)
```javascript
import { createStore } from 'redux';

function reducer (state = {}, action) {
    switch (action.type) {
        case 'PLUS':
            return {
                value: state.value + 1,
            };
        case 'MINUS':
            return {
                value: state.value - 1,
            };
        default:
            return {
                value: 0,
            };
    }
}

const store = createStore(reducer);

Page ({
    data: store.getState(),
    onLoad () {
        store.subscribe(this.listener)
    },
    listener () {
        const newData = store.getState();
        this.setData(newData);
    },
    add () {
        store.dispatch({
            type: 'ADD'
        });
    },
    minus () {
        store.dispatch({
            type: 'MINUS',
        });
    },
});
```
1. 严格的单向数据流
2. `reducer` 是纯函数。它仅仅用于计算下一个 `state`。它应该是完全可预测的
3. `action` 是一个普通对象 `action` 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作

## 3. redux 实现
