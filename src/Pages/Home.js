import React, { useState } from "react";
import FoodEntriesListing from "../Components/FoodEntries/FoodEntriesListing";
import UserSettings from "../Components/User/UserCalories";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Home = () => {
  const [key, setKey] = useState("entries");
  return (
    <>
      <h1>User Home Page</h1>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="entries" title="Food Entries">
          <FoodEntriesListing />
        </Tab>
        <Tab eventKey="setting" title="Update Calorie Target">
          <UserSettings />
        </Tab>
      </Tabs>
    </>
  );
};

export default Home;
