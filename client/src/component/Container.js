import React from "react";

function Container({ children, className }) {
  return (
    <div className={`max-w-6xl mx-auto p-3 ${className ? className : ""}`}>
      {children}
    </div>
  );
}

export default Container;
