import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Private = () => {
    const { store, actions } = useContext(Context);
    const [ user, setUser ] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        setUser(actions.getUser())
    })

    return(
        <div>
            User Id: {user.id}
            User Email: {user.email}
            User Password: {user.password}  
        </div>
    );

};