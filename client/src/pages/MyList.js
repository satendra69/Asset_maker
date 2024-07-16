import React from "react";
import Container from "../component/Container";
import SaveCard from "../component/saveCard/SaveCard";
import { listData } from "../dummy/dummy";
function MyList() {
  const data = listData;
  return (
    <div>
      <Container className={"py-8 space-y-10"}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2>Your Created List </h2>
            <p>Add new property in India</p>
            <hr className="bg-[#FECE51] w-32 h-1" />
          </div>
          <button className="border  p-4 text-white rounded-xl bg-black hover:border hover:border-[#FECE51] hover:text-[#FECE51] hover:bg-transparent transition-all duration-700 hover:scale-110">
            Add New
          </button>
        </div>
        {data.map((item) => (
          <SaveCard item={item} />
        ))}
      </Container>
    </div>
  );
}

export default MyList;
