import React, { useEffect, useRef, useState } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// 它直接在函数这里导出了 和其它组件还不一致 有什么猫腻吗？
export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  //////////////////////
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          修改 {props.name} 的内容
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          取消
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          保存
          <span className="visually-hidden">new name for {props.name}</span>
          {/*不理解为什么要做个隐藏的文本*/}
        </button>
      </div>
    </form>
  );
  //////////////////////
  //////////////////////
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            编辑 <span className="visually-hidden">{props.name}</span>
          {/*不理解为什么要做个隐藏的文本 感觉没有用啊*/}
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            删除 <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );
  //////////////////////


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // 设置显示是 编辑 还是 查看
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
