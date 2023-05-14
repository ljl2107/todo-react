import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
// 上面是一些导入 有React的一些组件和三个钩子
// 三个自定义的组件 Form FilterButton T odo 见名知意
// nanoid 是一个生成全局唯一ID的js库

// 用于跟踪一些值的状态和变化
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
// 过滤器常量
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
// 获取过滤属性名
const FILTER_NAMES = Object.keys(FILTER_MAP);
// 关键内容 App
function App(props) {
  // 好像是前一个是变量 后一个是对变量的操作
  // 一个任务数组 一个过滤器
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  // 切换任务的状态： 完成/不完成
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task 如果查到id相同则构建一个新的对象 否则不变
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  // 删除任务
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  // 编辑任务
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      // 套路好像是一样的 都是遍历查找对应的项 然后解构返回一个新的对象 最后再调用setTasks进行修改
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  // 获取一个常量任务列表
  const taskList = tasks
    .filter(FILTER_MAP[filter]) //过滤 用于在选择不同的时候进行选择
    .map((task) => (
      // 有用到前面的组件Todo 传入了属性和操作
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  // 过滤列表
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  // 增加
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };// 每一项有三个属性
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} 在队列中`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
