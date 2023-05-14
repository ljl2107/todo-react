import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// 初始化的一些数据
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 大概由四部分组成
  // TODO 修改ui 目前如果设置文本内容过长会导致超界 需要自适应
  // TODO 设置localstorge 或者 sookie 实现持久化存储
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
