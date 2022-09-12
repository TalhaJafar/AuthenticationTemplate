import { useState, useEffect } from "react";
import { getUserFoodEntries, getAdminFoodEntries } from '../../Services/foodEntries'
import { listMeals  } from '../../Services/meals'
import { getAllUsers  } from '../../Services/users'



const FoodEntriesListing = ({isAdmin=false}) => {

    const [users, setUsers] = useState([])
    const [meals, setMeals] = useState([])
    const [foodEntries, setfoodEntries] = useState(false)


    useEffect(()=>{

        listMeals().then(res => {
            setMeals(res)
            console.log("Meals List",res)
        })
        

        if(isAdmin) {

            getAllUsers().then(res => {
                setUsers(res)
                console.log("List of Users", res)
            })
            getAdminFoodEntries().then(res => {setfoodEntries(res)
                console.log("Admin Food Entries",res)})

        } else{
            getUserFoodEntries().then(res => {
                setfoodEntries(res)
            })
        }

    },[])


    return(
        <div>
            Food Entries List
            {console.log(foodEntries,"food Enteries")}
        </div>
    )
}


export default FoodEntriesListing