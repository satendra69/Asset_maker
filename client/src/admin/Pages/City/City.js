import React from "react";
import ExampleWithLocalizationProvider from "./component/DataTable/Provider";
import Container from "../../../component/Container";
function City() {
  return (
    <div>
      <Container className={"space-y-10"}>
        <div>
          <h2>City List</h2>
          <p>manage your city data here</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        <ExampleWithLocalizationProvider />
      </Container>
    </div>
  );
}

export default City;
