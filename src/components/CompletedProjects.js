import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// completed projects component that shows the completed/deleted projects
// all tasks of that project type is also displayed
// project can be deleted permanently

const CompletedProjects = ({
  tasks,
  projects,
  onShowProjects,
  showProjects,
  onShowProject,
  deleteProject,
}) => {
  projects = projects.filter((project) => project.completion === "deleted");
  return (
    <div>
      <h2
        onClick={onShowProjects}
        style={{ color: "white", backgroundColor: "black" }}
      >
        Completed Projects
        {showProjects ? <FaArrowUp /> : <FaArrowDown />}
      </h2>
      {projects.length > 0
        ? projects.map(
            (project) =>
              showProjects && (
                <div key={project.id}>
                  <h3
                    className="main"
                    onClick={() => onShowProject(project.id)}
                    style={{ backgroundColor: "#D3D3D3" }}
                  >
                    {project.text}
                    {project.show ? <FaArrowUp /> : <FaArrowDown />}
                  </h3>
                  {project.show && (
                    <div>
                      {tasks.map(
                        (task) =>
                          task.type === project.text && (
                            <h4
                              className="main"
                              style={{ backgroundColor: "#F4F4F4" }}
                            >
                              {task.text}
                            </h4>
                          )
                      )}
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="btn btn-centered"
                        style={{ background: "red" }}
                      >
                        Delete Project
                      </button>
                    </div>
                  )}
                </div>
              )
          )
        : showProjects && (
            <h3 className="main" style={{ backgroundColor: "#F4F4F4" }}>
              No Projects
            </h3>
          )}
    </div>
  );
};

export default CompletedProjects;
