// is not html but jsx(javascript extension)
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import React from "react";
import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CompletedTasks from "./components/CompletedTasks";
import { Link } from "react-router-dom";
import Projects from "./components/Projects";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showShortTasks, setShowShortTasks] = useState(false);
  const [showLongTasks, setShowLongTasks] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showCompletedProjects, setShowCompletedProjects] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      const projectsFromServer = await fetchProjects();
      setTasks(tasksFromServer);
      setProjects(projectsFromServer);
    };
    getTasks();
  }, []); // dependancy array

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:7000/tasks");
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:7000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:7000/projects");
    const data = await res.json();
    return data;
  };
  const fetchProject = async (id) => {
    const res = await fetch(`http://localhost:7000/projects/${id}`);
    const data = await res.json();
    return data;
  };

  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   console.log(id);
  //   const newTask = { id, ...task }; // ...task return the text, day, and reminder of the task passed as arg
  //   setTasks([...tasks, newTask]); // sets tasks to an array with old tasks and new task
  // };

  const addTask = async (task) => {
    task.completion = "in progress";
    if (task.type === "project") {
      const res = await fetch("http://localhost:7000/projects", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setProjects([...projects, data]);
    } else {
      const res = await fetch("http://localhost:7000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]); // sets tasks to an array with old tasks and new task
    }
  };

  const deleteTaskPerm = async (id) => {
    await fetch(`http://localhost:7000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteTask = async (id) => {
    const taskToDelete = await fetchTask(id);
    const updTask = { ...taskToDelete, completion: "deleted" };
    const res = await fetch(`http://localhost:7000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completion: data.completion } : task
      )
    );
  };
  const deleteProject = async (id) => {
    const projectToDelete = await fetchProject(id);
    const updTask = { ...projectToDelete, completion: "deleted" };
    const res = await fetch(`http://localhost:7000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, completion: data.completion }
          : project
      )
    );
  };

  const deleteProjectPerm = async (id) => {
    const projectToDelete = await fetchProject(id);
    await fetch(`http://localhost:7000/projects/${id}`, {
      method: "DELETE",
    });
    setProjects(projects.filter((project) => project.id !== id));
    for (let i = 0; i < tasks.length; i++) {
      if (projectToDelete.text === tasks[i].type) deleteTaskPerm(tasks[i].id);
    }
  };

  const completeTask = async (id) => {
    const taskToDelete = await fetchTask(id);
    const updProject = { ...taskToDelete, completion: "completed" };
    const res = await fetch(`http://localhost:7000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updProject),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completion: data.completion } : task
      )
    );
  };

  //Reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:7000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const toggleShow = async (id) => {
    const projectToShow = await fetchProject(id);
    const updProject = { ...projectToShow, show: !projectToShow.show };
    const res = await fetch(`http://localhost:7000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updProject),
    });
    const data = await res.json();

    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, show: data.show } : project
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onShow={() => setShowShortTasks(!showShortTasks)}
                showShort={showShortTasks}
                onComplete={completeTask}
                type={"short"}
              />
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onShow={() => setShowLongTasks(!showLongTasks)}
                showShort={showLongTasks}
                onComplete={completeTask}
                type={"long"}
              />
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onShow={() => setShowAppointments(!showAppointments)}
                showShort={showAppointments}
                onComplete={completeTask}
                type={"appointment"}
              />
              <Projects
                projects={projects}
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onShow={toggleShow}
                onComplete={completeTask}
                onAdd={addTask}
                deleteProject={deleteProject}
              ></Projects>
              <div style={{ textAlign: "center" }}>
                <Link to="/completedTasks" className="button">
                  View Completed Tasks
                </Link>
              </div>
            </>
          )}
        />

        <Route path="/completedTasks">
          <CompletedTasks
            tasks={tasks}
            onDelete={deleteTaskPerm}
            showTasks={showCompletedTasks}
            onShowTasks={() => setShowCompletedTasks(!showCompletedTasks)}
            projects={projects}
            showProjects={showCompletedProjects}
            onShowProjects={() =>
              setShowCompletedProjects(!showCompletedProjects)
            }
            onShowProject={toggleShow}
            deleteProject={deleteProjectPerm}
          />
        </Route>
      </div>
    </Router>
  );
};

export default App;
