import React, { useState } from "react";

const DragNDrop2 = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    const updatedColumns = { ...columns };
    updatedColumns.todo.items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updatedColumns);
    setNewTask("");
  };

  const handleDragStart = (colId, item) => {
    setDraggedItem({ colId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { colId: sourceColId, item } = draggedItem;
    if (sourceColId === colId) return;

    const updatedColumns = { ...columns };

    updatedColumns[sourceColId].items = updatedColumns[
      sourceColId
    ].items.filter((i) => i.id !== item.id);

    updatedColumns[colId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  return (
    <div className="p-6 w-full min-h-screen bg-black flex flex-col items-center">
      <h1 className="text-white text-2xl mb-6">Kanban Board</h1>

      <div className="flex gap-3 mb-6 w-full max-w-2xl">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="text-white border px-4 py-2 rounded-md w-full bg-transparent"
          onKeyDown={(e) => e.key === "Enter" && addNewTask()}
        />
        <button
          onClick={addNewTask}
          className="bg-white text-black px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      <div className="flex gap-6 w-full max-w-6xl">
        {Object.entries(columns).map(([colId, column]) => (
          <div
            key={colId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colId)}
            className="bg-gray-900 text-white rounded-lg p-4 flex-1 min-h-[300px]"
          >
            <h2 className="font-bold text-lg mb-3">{column.name}</h2>
            <div className="space-y-2">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(colId, item)}
                  className="bg-gray-700 px-3 py-2 rounded-md cursor-grab"
                >
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragNDrop2;
