import { useRef } from "react";

// 定义状态管理库
class Formstore {
  constructor() {
    this.store = {}; //状态值  name: value
    this.fieldEntities = [];

    this.callbacks = [];
  }
  setCallbacks = (callbacks) => {
    this.callbacks = { ...callbacks, ...this.callbacks };
  };
  //   注册实例（fouceUpdata）
  //   注册与取消注册
  //  订阅与取消订阅
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };
  //   get
  getFildsValue = () => {
    return { ...this.store };
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  //  set
  setFieldsValue = (newStore) => {
    // 1. updata store
    this.store = {
      ...this.store,
      ...newStore,
    };
    console.log(this.store);

    // 2 updata field
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };
  valiadte = () => {
    let err = [];
    // todo 校验
    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props;
      const value = this.getFieldValue(name);
      let rule = rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({ [name]: rule.message, value });
      }
    });
    console.log(err, "err");
    return err;
  };
  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    let err = this.valiadte();
    if (err.length === 0) {
      // 通过
      onFinish(this.getFildsValue());
    } else {
      // 没通过
      onFinishFailed();
    }
  };
  getForm = () => {
    return {
      getFildsValue: this.getFildsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}
export default function useForm() {
  const formRef = useRef();
  // 存值，在组件卸载之前指向的都是同一个值
  if (!formRef.current) {
    const formstore = new Formstore();
    formRef.current = formstore.getForm();
  }
  return [formRef.current];
}
