import React, { useState } from "react";
import "./App.css";
import Task1 from "./components/Task1/Task1";
import Task2 from "./components/task2";
import Task3 from "./components/task3";
import Task4 from "./components/task4";
import Task5 from "./components/task5";
import Task6 from "./components/task6";
import Task7 from "./components/Task7/Task7";
import Task8 from "./components/task8";
import Task9 from "./components/task9";
import Task10 from "./components/task10";

function App() {
  const [currentTask, setCurrentTask] = useState(1);

  const renderTask = () => {
    switch (currentTask) {
      case 1:
        return <Task1 />;
      case 2:
        return <Task2 />;
      case 3:
        return <Task3 />;
      case 4:
        return <Task4 />;
      case 5:
        return <Task5 />;
      case 6:
        return <Task6 />;
      case 7:
        return <Task7 />;
      case 8:
        return <Task8 />;
      case 9:
        return <Task9 />;
      case 10:
        return <Task10 />;
      default:
        return <Task1 />;
    }
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentTask(1)}>Task 1</button>
        <button onClick={() => setCurrentTask(2)}>Task 2</button>
        <button onClick={() => setCurrentTask(3)}>Task 3</button>
        <button onClick={() => setCurrentTask(4)}>Task 4</button>
        <button onClick={() => setCurrentTask(5)}>Task 5</button>
        <button onClick={() => setCurrentTask(6)}>Task 6</button>
        <button onClick={() => setCurrentTask(7)}>Task 7</button>
        <button onClick={() => setCurrentTask(8)}>Task 8</button>
        <button onClick={() => setCurrentTask(9)}>Task 9</button>
        <button onClick={() => setCurrentTask(10)}>Task 10</button>
      </nav>
      <div className="task-container">{renderTask()}</div>
    </div>
  );
}

export default App;
