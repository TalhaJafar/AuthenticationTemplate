import FoodEntriesListing  from "../Components/FoodEntries/FoodEntriesListing";
import UserListing from "../Components/UserListing/usersListings";
import { useAuth } from "../Contexts/AuthContext";

const AdminDashbored = () => {
  const { onLogin, user } = useAuth();
  const {isAdmin} = user
  console.log(user,"user aa gay")
  return (
  <div>
    <h1> AdminDashbored Page</h1>
    <FoodEntriesListing isAdmin={isAdmin}/>
    <UserListing/>

  </div>
  
  
  );
};

export default AdminDashbored;
