import react from "react";
import FieldContext from "./FildContext";
export default function Form({ children, form, onFinish, onFinishFailed }) {
  form.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(form.submit());
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
      {/* {children} */}
    </form>
  );
}
