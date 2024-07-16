import { listData } from "../../dummy/dummy";
import "./list.scss";
import Filter from "../../component/filter/filter";
import Card from "../../component/card/card";
import Container from "../../component/Container";
import Map from "../../component/map/map";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function List() {
  const data = listData;
  const { filters } = useParams();
  // useEffect(() => {
  //   fetchData(JSON.parse(filters));
  // }, [filters]);
  // const fetchData = async (filters) => {
  //   console.log("filters", filters);
  //   try {
  //     // Construct API URL based on filters
  //     let apiUrl = "http://localhost:3000/list";
  //     if (filters) {
  //       const queryParams = Object.entries(filters)
  //         .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  //         .join("&");
  //       apiUrl += `?${queryParams}`;
  //     }

  //     // const response = await fetch(apiUrl);
  //     // const jsonData = await response.json();
  //     // setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <>
      <Container>
        <Filter />
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
        <div className="mapContainer h-full ">
          <Map items={data} />
        </div>
      </Container>
    </>
  );
}

export default List;
