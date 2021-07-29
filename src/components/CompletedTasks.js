import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";
import CompletedProjects from "./CompletedProjects";

// entire display for completed tasks including completed projects
// divides completed and deleted tasks into two flexboxes
// tasks and projects can be deleted permanently
const CompletedTasks = ({
  tasks,
  projects,
  onDelete,
  showTasks,
  showProjects,
  onShowTasks,
  onShowProjects,
  onShowProject,
  deleteProject,
}) => {
  const regtasks = tasks.filter(
    (task) =>
      task.type === "short" ||
      task.type === "long" ||
      task.type === "appointment"
  );
  return (
    <>
      <h2
        // className="main"
        onClick={onShowTasks}
        style={{ backgroundColor: "lightblue" }}
      >
        Completed Tasks {showTasks ? <FaArrowUp /> : <FaArrowDown />}
      </h2>
      <div style={{ display: "flex", flexWrap: "center" }}>
        {showTasks && (
          <div className="one">
            <h3
              style={{
                backgroundColor: "#00b33c",
                textAlign: "center",
              }}
            >
              Completed
            </h3>

            {regtasks.map(
              (task) =>
                task.completion === "completed" && (
                  <div
                    style={{
                      backgroundColor: "lightgreen",
                      marginTop: "3px",
                      cursor: "pointer",
                      padding: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "95%" }}> {task.text}</div>
                      <div style={{ flexGrow: "1" }}>
                        <FaTimes
                          style={{ color: "red" }}
                          onClick={() => onDelete(task.id)}
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        {showTasks && (
          <div className="two">
            <h3 style={{ backgroundColor: "red", textAlign: "center" }}>
              Deleted
            </h3>
            {regtasks.map(
              (task) =>
                task.completion === "deleted" && (
                  <div
                    style={{
                      backgroundColor: "pink",
                      marginTop: "3px",
                      cursor: "pointer",
                      padding: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "95%" }}> {task.text}</div>
                      <div style={{ flexGrow: "1" }}>
                        <FaTimes
                          style={{ color: "red" }}
                          onClick={() => onDelete(task.id)}
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <CompletedProjects
        projects={projects}
        onShowProjects={onShowProjects}
        showProjects={showProjects}
        tasks={tasks}
        onShowProject={onShowProject}
        deleteProject={deleteProject}
      ></CompletedProjects>
      <Link to="/" className="button">
        View In Progress Tasks
      </Link>
    </>
  );
};

export default CompletedTasks;
