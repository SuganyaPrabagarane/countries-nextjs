"use client";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { fetchFavourites } from "@/lib/features/favourites/favouritesSlice";
import { Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";

const FavouritesPage = () => {

const  {user, loading: authLoading } = useAuth();
const dispatch = useDispatch();
const favourites = useSelector((state) => state.favourites.favourites);
const loading = useSelector((state)=>state.favourites.loading);
console.log("Favourites: ", favourites);

useEffect(() =>{
    if(user){
        dispatch(fetchFavourites());
    }
}, [user,dispatch]);

if(authLoading || loading){
    return < CircularProgress/>;
}

if(!user){  
    return (
    <div>
        <p>Login to see the favourites country</p>
        
    </div>)
}

    return(
      <Box sx = {{maxWidth: 1200, mx: "auto", p:3}} >
        {favourites.length === 0 ? (
            <Typography variant = "h4"> No favourities found</Typography>
        ) : (
            <Grid container spacing = {2} >
                {favourites.map((favourite) =>{
                    const country = favourite.country_name;

                    return(<Grid item xs={12} sm={6} md={4} lg={3} key = {favourite.id}> 
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Image 
                                            width={100}
                                            height={60}
                                            style={{objectFit: "cover", borderRadius: "4px"}}
                                            src={country.flags.svg}
                                            alt={country.name.common}
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Grid>
                    )
                })}
            </Grid>
        ) }
      </Box>
    )
}

export default FavouritesPage;