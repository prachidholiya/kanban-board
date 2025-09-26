import { useState } from "react";

const DragNDrop = () => {
  const [columns, setColumns] = useState({
    column1: ["Item 1", "Item 2"],
    column2: ["Item 3", "Item 4"],
  });

  const onDrop = (event, toColumn) => {
    const item = event.dataTransfer.getData("item");
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;
    setColumns((prev) => {
      const fromData = prev[fromColumn].filter((older) => older !== item);
      const toData = [...prev[toColumn], item];
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData,
      };
    });
  };

  const onDragStart = (event, item, fromColumn) => {
    event.dataTransfer.setData("item", item);
    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  const onDragOver = (event) => event.preventDefault();

  return (
    <div className="flex justify-between p-10 gap-6">
      {Object.keys(columns).map((column) => (
        <div
          onDrop={(event) => onDrop(event, column)}
          onDragOver={onDragOver}
          key={column}
          className="w-64 min-h-[400px] bg-gray-100 p-4 rounded-2xl shadow-md border border-gray-300"
        >
          <h2 className="text-lg font-semibold mb-4 capitalize">{column}</h2>
          <div className="flex flex-col gap-3">
            {columns[column].map((item) => (
              <div
                draggable
                onDragStart={(event) => onDragStart(event, item, column)}
                key={item}
                className="p-3 bg-white rounded-xl shadow hover:bg-gray-50 cursor-pointer transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragNDrop;
