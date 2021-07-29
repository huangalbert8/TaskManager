import { FaTimes, FaCheck } from "react-icons/fa";

// display for a single task
// double click to set reminder
// click x to delete
// click check to complete

const Task = ({ task, onDelete, onToggle, onComplete }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`} // if task.reminder true then classname = task.reminder else classname = task
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        <div style={{ width: "450px" }}>{task.text} </div>
        <div style={{ width: "50px" }}>
          <FaTimes style={{ color: "red" }} onClick={() => onDelete(task.id)} />
          {"   "}
          <FaCheck
            style={{ color: "green" }}
            onClick={() => onComplete(task.id)}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
