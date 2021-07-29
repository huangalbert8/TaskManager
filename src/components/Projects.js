import React from "react";
import Project from "./Project";

//displays all the projects
const Projects = ({
  projects,
  tasks,
  onDelete,
  onToggle,
  onShow,
  onComplete,
  onAdd,
  deleteProject,
}) => {
  return (
    <div>
      {projects.map(
        (project) =>
          project.completion === "in progress" && (
            <Project
              project={project}
              key={project.id}
              tasks={tasks}
              onDelete={onDelete}
              onToggle={onToggle}
              onShow={onShow}
              showShort={project.show}
              onComplete={onComplete}
              type={project.text}
              onAdd={onAdd}
              deleteProject={deleteProject}
            ></Project>
          )
      )}
    </div>
  );
};

export default Projects;
