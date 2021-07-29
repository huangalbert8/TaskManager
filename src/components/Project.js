import Task from "./Task";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";

// display for a single project component
// task name, form to add task, and tasks underneath
const Project = ({
  tasks,
  project,
  onDelete,
  onToggle,
  showShort,
  onShow,
  onComplete,
  onAdd,
  deleteProject,
}) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    const reminder = false;
    const day = "";
    const type = project.text;
    e.preventDefault();
    if (!text) {
      alert("Please add a task.");
      return;
    }
    onAdd({ text, day, reminder, type });
    setText("");
  };
  return (
    <>
      <h2
        onClick={() => onShow(project.id)}
        style={{ background: "black", color: "white" }}
      >
        {project.text}
        {showShort ? <FaArrowUp /> : <FaArrowDown />}
      </h2>
      {showShort && (
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="add-proj-form"
              type="text"
              placeholder={"Add task to " + project.text}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <input type="submit" value="Save Task" className="btn-proj"></input>
          </div>
        </form>
      )}

      {tasks.length > 0
        ? tasks.map(
            (task) =>
              showShort &&
              project.text === task.type &&
              task.completion === "in progress" && (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggle={onToggle}
                  onComplete={onComplete}
                ></Task>
              )
          )
        : showShort && <h3 style={{ marginLeft: "30px" }}>No Tasks</h3>}
      {showShort && (
        <button
          onClick={() => deleteProject(project.id)}
          className="btn btn-centered"
          style={{ background: "green" }}
        >
          Complete Project
        </button>
      )}
    </>
  );
};

export default Project;
