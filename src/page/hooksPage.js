import React, { useReducer } from "react";
import { countReducer } from "../store/index";
const init = (initArg) => initArg - 0;
export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);
  return (
    <div>
      <p>HooksPage</p>
      <div onClick={() => dispatch({ type: "ADD" })}>{state}</div>
    </div>
  );
}
