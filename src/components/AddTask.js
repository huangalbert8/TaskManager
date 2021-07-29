import { useState } from "react";

// form to add task that asks for text, date, and type(urgent, less urgent, appointment, project)

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [type, setType] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task.");
      return;
    } else if (!type) {
      alert("Please select the type of task.");
      return;
    }
    onAdd({ text, day, reminder, type });
    setText("");
    setDay("");
    setReminder(false);
    setType("");
    var ele = document.getElementsByName("type");
    for (let i = 0; i < ele.length; i++) ele[i].checked = false;
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="Add Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        ></input>
      </div>
      <div className="form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        ></input>
      </div>
      <div onChange={(e) => setType(e.target.value)}>
        Task Type: <input type="radio" name="type" value="short" /> Urgent
        {"   "}
        <input type="radio" name="type" value="long" /> Less Urgent{"   "}
        <input type="radio" name="type" value="appointment" /> Appointment
        {"   "}
        <input type="radio" name="type" value="project" /> Project
      </div>
      <input type="submit" value="Save Task" className="btn btn-block"></input>
    </form>
  );
};

export default AddTask;
