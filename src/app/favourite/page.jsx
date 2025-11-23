"use client";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { fetchFavourites } from "@/lib/features/favourites/favouritesSlice";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FavouriteButton from "@/components/FavouriteButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);
  const router = useRouter();

  useEffect(() => {
    if (user) {
        dispatch(fetchCountries());
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  const handleCountryClick = (countryName) => {
    const slug = countryName?.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  const getCurrencies = (country) => {
    if (!country?.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((c) => `${c.name} (${c.symbol})`)
      .join(", ");
  };

  if (authLoading || loading ) return <CircularProgress />;
  if (!user) return <Typography>Login to see your favourite countries</Typography>;

  const favouriteCountries = countries.filter((country) =>
    favourites.some((fav) => fav.country_name === country.name.common)
  );

  const handleBack = () => {
    router.push("/countries");
};

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
                Back to Countries
            </Button> <br></br>

      {favouriteCountries.length === 0 ? (
        <Typography variant="h4">No favourite countries found</Typography>
      ) : (
        <Grid container spacing={3}>
          {favouriteCountries.map((country) => (
            <Card key={country.name.common} sx={{ width: "300px", height: "250px",  position: "relative" }}>
              <CardActionArea onClick={() => handleCountryClick(country?.name?.common)}>
                <CardContent>
                    <img
                      src={country.flags.svg || "/fallback-flag.png"}
                      alt={country.name.common || "Country flag"}
                      width={150}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  <Typography variant="h5">{country.name.common || "Unknown Country"}</Typography>
                  <Typography variant="h6">{country.population.toLocaleString() || "N/A"}</Typography>
                  <Typography variant="h6">{getCurrencies(country)}</Typography>
                  <Typography variant="h6">({country.region || "Unknown Region"})</Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <FavouriteButton country={country} />
              </Box>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavouritesPage;
