import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const  [projectState, setProjectState] = useState({
    selectedProjectId : undefined,
    projects: [],
    tasks:[]
  })

  function handleAddTask(taskText){
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: taskText,
        projectId: prevState.selectedProjectId,
        id:taskId
      }

      return {
        ...prevState,
        tasks:[newTask, ...prevState.tasks]
      }
    }) 
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:null,
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:id,
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id:Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined, 
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  const selectedTask  = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId);

  let content = <SelectedProject 
                  project={selectedProject} 
                  onDelete={handleDeleteProject } 
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  tasks={selectedTask}/>;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onAddProject={handleStartAddProject} />
  }


  return (
    <main className="h-screen my-8 flex gap-8">
    <SideBar onAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
    {content}
    </main>
  );
}

export default App;
