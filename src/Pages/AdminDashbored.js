import React, { useState } from "react";
import FoodEntriesListing from "../Components/FoodEntries/FoodEntriesListing";
import UserListing from "../Components/UserListing/usersListings";
import { useAuth } from "../Contexts/AuthContext";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const AdminDashbored = () => {
  const { user } = useAuth();
  const { isAdmin } = user;
  const [key, setKey] = useState("entries");
  return (
    <div>
      <h1> AdminDashbored Page</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="entries" title="Food Entries">
          <FoodEntriesListing isAdmin={isAdmin} />
        </Tab>
        <Tab eventKey="reports" title="Reports">
          <UserListing />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashbored;
