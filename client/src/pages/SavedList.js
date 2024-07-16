import React from "react";
import Container from "../component/Container";
import SaveCard from "../component/saveCard/SaveCard";
import { listData } from "../dummy/dummy";
function SavedList() {
  const data = listData;
  return (
    <div>
      <Container className={"py-8 space-y-10"}>
        <div className="space-y-2">
          <h2>Your Saved Properties </h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        {data.map((item) => (
          <SaveCard item={item} />
        ))}
      </Container>
    </div>
  );
}

export default SavedList;
