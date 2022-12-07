// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "../react-redux-nut";
export default function ReactReduxHookPage(props) {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();
  const add = () => {
    dispatch({ type: "ADD" });
  };
  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}
