import React, { useEffect, useState } from "react";
import Container from "../component/Container";
import SaveCard from "../component/saveCard/SaveCard";
import axios from "axios";

function SavedList({ userId }) {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await axios.get(`/api/saved-list/${userId}`);
        setSavedProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      }
    };
    fetchSavedProperties();
  }, [userId]);

  return (
    <div>
      <Container className={"py-8 space-y-10"}>
        <div className="space-y-2">
          <h2>Your Saved Properties</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        {savedProperties.map((item) => (
          <SaveCard key={item.id} item={item} />
        ))}
      </Container>
    </div>
  );
}

export default SavedList;
