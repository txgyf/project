// import ReduxPage from "./page/ReduxPage";
// import HooksPage from "./page/HooksPage";
import { useState } from "react";
// import ReactReduxHookPage from "./page/ReactReduxHookPage";
import ReactReduxPage from "./page/ReactReduxPage";

import ReactReduxHookPage from "./page/ReactReduxHookPage";

export default function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* <ReduxPage /> */}
      {/* <HooksPage /> */}
      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}
      {/* <ReactReduxPage omg={count} /> */}

      <ReactReduxHookPage />
    </div>
  );
}
