import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Container from "../component/Container";
import Card from "../component/card/card";
import httpCommon from "../http-common";

function SavedList() {
  const location = useLocation();
  const { userId } = location.state || {};
  const [savedProperties, setSavedProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSavedProperties = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is not available.");
      }
      const savedListResponse = await httpCommon.get(`/saved-list/${userId}`);
      const savedProperties = savedListResponse.data;

      if (!savedProperties || savedProperties.length === 0) {
        throw new Error("No saved properties found.");
      }

      // Fetch details for each saved property
      const propertyDetailsPromises = savedProperties.map(async (savedItem) => {
        try {
          const propertyResponse = await httpCommon.get(`/list/property/${savedItem.property_id}`);
          return propertyResponse?.data?.data;
        } catch (error) {
          console.error(`Failed to fetch details for property ID: ${savedItem.property_id}`, error);
          return null;
        }
      });

      const detailedProperties = await Promise.all(propertyDetailsPromises);
      setSavedProperties(detailedProperties.filter(item => item !== null));
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, [userId]);

  const handlePropertyRemoved = () => {
    fetchSavedProperties();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Container className={"py-8 space-y-10"}>
        <div className="space-y-2">
          <h2>Error</h2>
          <p>{error}</p>
          <hr className="w-32 h-1 bg-red-500" />
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container className={"py-8 space-y-10"}>
        <div className="space-y-2">
          <h2>Your Saved Properties</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        {savedProperties?.map((item) => (
          <Card key={item.RowID} item={item} onPropertyRemoved={handlePropertyRemoved} />
        ))}
        {savedProperties.length === 0 && (
          <p>No saved properties found.</p>
        )}
      </Container>
    </div>
  );
}

export default SavedList;
