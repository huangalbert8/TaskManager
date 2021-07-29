import Task from "./Task";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// displays for all the general tasks
// seperated by urgent, less urgent, and appointments

const Tasks = ({
  tasks,
  onDelete,
  onToggle,
  showShort,
  onShow,
  onComplete,
  type,
}) => {
  let color = "";
  let title = "";
  let textColor = "black";
  tasks = tasks.filter(
    (task) => task.type === type && task.completion === "in progress"
  );
  switch (type) {
    case "long":
      color = "pink";
      title = "Less Urgent Tasks";
      break;
    case "short":
      color = "red";
      title = "Urgent Tasks";
      break;
    case "appointment":
      color = "aquamarine";
      title = "Appointments";
      break;
    default:
      color = "beige";
      title = type;
    // textColor = "white";
  }
  return (
    <div>
      <h2 onClick={onShow} style={{ background: color, color: textColor }}>
        {title}
        {showShort ? <FaArrowUp /> : <FaArrowDown />}
      </h2>

      {tasks.length > 0
        ? tasks.map(
            (task) =>
              showShort && (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggle={onToggle}
                  onComplete={onComplete}
                ></Task>
              )
          )
        : showShort && <h3 className={"task"}>No Tasks</h3>}
    </div>
  );
};

export default Tasks;
