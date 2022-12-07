//  Connext 传值 跨组件层级传递数据
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
  useSyncExternalStore,
} from "react";
import { bindActionCreators } from "../redux-nut";
// ! 1. 创建context对象
const Context = React.createContext();

// ! 2. provider组件传递value （store)
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

//! 3. 后代消费provide传递下来的value
// * contextType 只能用在类组件，只能订阅单一的context来源
// * useContext 只能用在函数组件或者自定义hook中
// * consumer 没有组件限制，注意使用方法

export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
    const store = useContext(Context);
    console.log(store, "store");
    const { getState, dispatch, subscribe } = store;

    let dispatchProps = { dispatch };

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
      console.log(dispatchProps, "dispatchProps");
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const forceUpdate = useForceUpdate();
    //DOM -- effect
    // useLayoutEffect(() => {
    //   const unsubscribe = subscribe(() => {
    //     forceUpdate();
    //   });
    //   return () => unsubscribe();
    // }, [subscribe]);
    const state = useSyncExternalStore(() => {
      subscribe(forceUpdate);
    }, getState);
    const stateProps = mapStateToProps(state);
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };

function useForceUpdate() {
  const [state, setState] = useState(0);
  const updated = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return updated;
}

export function useSelector(selctor) {
  const store = useContext(Context);
  const { getState, subscribe } = store;
  const forceUpdate = useForceUpdate();
  const state = useSyncExternalStore(() => {
    subscribe(forceUpdate);
  }, getState);
  const selctorState = selctor(state);
  return selctorState;
}

export function useDispatch() {
  const store = useContext(Context);
  const { dispatch, subscribe } = store;
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => unsubscribe();
  }, [subscribe]);
  return dispatch;
}
