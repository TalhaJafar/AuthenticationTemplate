import { useState, useEffect } from "react";
import { getAllUsers } from '../../Services/users'


const UsersListing = () => {

    useEffect(()=>{
        getAllUsers().then(res => console.log(res,"llllll"))
    },[])


    return(
        <div>
            User List
            {console.log("user Enteries")}
        </div>
    )
}


export default UsersListing