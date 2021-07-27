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
### createStore
```javascript
export default function createStore(reducer, preloadedState, enhancer) {
  // 保证reducer是一个函数
  if (typeof reducer !== 'function') {
    throw new Error(
      `Expected the root reducer to be a function. Instead, received: '${kindOf(
        reducer
      )}'`
    )
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false
  
  function getState() {
    if (isDispatching) {
      throw new Error()
    }
    return currentState
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error()
    }

    if (isDispatching) {
      throw new Error()
    }

    let isSubscribed = true
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error()
      }

      isSubscribed = false

      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error()
    }

    if (typeof action.type === 'undefined') {
      throw new Error()
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error()
    }

    currentReducer = nextReducer

    // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.
    dispatch({ type: ActionTypes.REPLACE })
  }

  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError()
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      },
    }
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  }
}
```