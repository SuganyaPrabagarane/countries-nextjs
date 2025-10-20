"use client";

import { useAuth } from "@/app/context/AuthContext";
import { addFavourite, removeFavourite } from "@/lib/features/favourites/favouritesSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const FavouriteButton = ({country, variant = "button"}) =>{
    const dispatch = useDispatch();
    const {user} = useAuth();
    const isFavourite = useSelector((state) => 
        state.favourites.favourites.some(
            (favourite) => favourite.country_name == country?.name?.common
        )
    );

    const loading = useSelector((state) => state.favourites.loading);

    const toggleFavourite = () =>{
        if(isFavourite){
            dispatch(removeFavourite(country.name.common));
        } else {
            dispatch(addFavourite(country));
        }
    }

    if(!user){
        return null;
    }

    return (
        <Tooltip
            title = {isFavourite ? "Remove from favourities" : "Add to Favourites"}
        >
         
                < IconButton
                onClick={toggleFavourite}
                disabled={loading}
                color={isFavourite ? "error": "primary"}
                
                >
                {isFavourite ? <Favorite /> : <FavoriteBorder />}

                </IconButton>
            

        </Tooltip>
        
    )

}

export default FavouriteButton;