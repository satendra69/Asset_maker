import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomLabel = ({onRowClick}) => {
  const [labels, setLabels] = useState([]);

  const handleAddLabel = () => {
    setLabels([...labels, { name: "", color: "blue" }]);
   
  };

  const handleLabelChange = (index, field, value) => {
    const newLabels = [...labels];
    newLabels[index][field] = value;
    setLabels(newLabels);
    onRowClick(newLabels);
  };

  const handleDeleteLabel = (index) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);
    setLabels(newLabels);
   
  };

  return (
    <div>
      <hr className="border-gray-400 my-8" />
      <h2 className="text-xl font-semibold">Labels</h2>
      <br />
      <div className="mb-7">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={label.name}
              onChange={(e) => handleLabelChange(index, "name", e.target.value)}
              placeholder="Enter Label Name"
              className="block mr-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <select
              value={label.color}
              onChange={(e) =>
                handleLabelChange(index, "color", e.target.value)
              }
              className="block mr-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="nselab">Not Selected</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
            </select>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDeleteLabel(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <button
          onClick={handleAddLabel}
          className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold"
        >
          + Add Custom Label
        </button>
      </div>
    </div>
  );
};

export default CustomLabel;
