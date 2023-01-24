import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectForm = () => {
  const [managerList, setManagerList] = useState([]);
  const [selectedManager, setSelectedManager] = useState({});

  const [project, setProject] = useState({
    name: '',
    manager: {
      id: '',
      name: '',
    },
    tasks: [{
      name: '',
      startDate: '',
      endDate: '',
    }],
  });

  const handleManagerChange = event => {
    const {value} = event.target;
    setSelectedManager(managerList.find(manager => manager.id === value));
    setProject({
      ...project,
      manager: {
        id: value
      }
    });
  };

  const handleProjectNameChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/project/new', project)
      .then((res) => {
        console.log(res);
        setProject({
          name: '',
          manager: {
            id: '',
            name: '',
          },
          tasks: [{
            name: '',
            startDate: '',
            endDate: '',
          }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTaskChange = (e, index) => {
    const tasks = [...project.tasks];
    tasks[index] = {
      ...tasks[index],
      [e.target.name]: e.target.value,
    };
    setProject({
      ...project,
      tasks,
    });
  }

  const addTask = () => {
    setProject({
      ...project,
      tasks: [...project.tasks, {name: '', startDate: '', endDate: ''}],
    });
  };

  const removeTask = (index) => {
    const tasks = [...project.tasks];
    tasks.splice(index, 1);
    setProject({
      ...project,
      tasks,
    });
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/user/get-all')
      .then((res) => {
        setManagerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center mx-auto w-25">
      <form onSubmit={handleSubmit} className="form-control">
        <h2 className="text-center my-3">Project</h2>
        <div className="form-group">
          <label htmlFor="name"
                 className="form-label">Name:</label>
          <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Please enter a project name"
                 value={project.name}
                 onChange={handleProjectNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="manager" className="form-label">Manager:</label>
          <select className="form-select"
                  name="manager"
                  value={project.manager.id}
                  onChange={handleManagerChange}>
            <option className="dropdown-item" value="" disabled>Select a Manager</option>
            {
              managerList.length > 0 ? managerList.map((manager) => (
                <option key={manager.id} value={manager.id}>{manager.name}</option>
              )) : <option value="" disabled>No Managers Found</option>
            }
          </select>
        </div>
        <h3 className="my-3">Tasks</h3>
        {
          project.tasks.map((task, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor="name">Task Name:</label>
                <input type="text" className="form-control" name="name" value={task.name}
                       onChange={(e) => handleTaskChange(e, index)}/>
              </div>
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <div className="input-group">
                    <input type="date"
                           className="form-control"
                           name="startDate"
                           value={task.startDate}
                           onChange={(e) => handleTaskChange(e, index)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <div className="input-group">
                    <input type="date"
                           className="form-control"
                           name="endDate"
                           value={task.endDate}
                           onChange={(e) => handleTaskChange(e, index)}
                    />
                  </div>
                </div>
                <br/>
                <button type="button"
                        className="btn btn-danger"
                        onClick={() => removeTask(index)}>Remove Task
                </button>
              </div>
            </div>
          ))
        }
        <br/>
        <button type="button"
                className="btn btn-success"
                onClick={addTask}>Add Task
        </button>
        <br/>
        <br/>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default ProjectForm;
