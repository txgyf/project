import React, { useLayoutEffect, useContext } from "react";
import FieldContext from "./FildContext";

export default function Filed(props) {
  const { getFieldValue, setFieldsValue, registerFieldEntities } =
    useContext(FieldContext);
  const { children, name } = props;
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    const unregister = registerFieldEntities({
      props,
      onStoreChange: forceUpdate,
    });
    return unregister;
  }, []);
  const getControlled = () => {
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
        // forceUpdate();
        console.log(name, "newValue");
      },
    };
  };
  const newChilder = React.cloneElement(children, getControlled());
  return newChilder;
}
