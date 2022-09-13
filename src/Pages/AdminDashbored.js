import React, { useState } from "react";
import FoodEntriesListing from "../Components/FoodEntries/FoodEntriesListing";
// import UserListing from "../Components/UserListing/usersListings";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const AdminDashbored = () => {
  const [key, setKey] = useState("entries");
  return (
    <div className="mt-5 mb-5">
      <h1 className="mt-5 mb-5"> AdminDashbored Page</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="entries" title="Food Entries">
          <FoodEntriesListing />
        </Tab>
        <Tab eventKey="reports" title="Reports">
          {/* <UserListing /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashbored;
