"use client";
import { useAuth } from "@/app/context/AuthContext";
import FavouriteButton from "@/components/FavouriteButton";
import { clearSelectedCountry, setSelectedCountry, fetchCountries } from "@/lib/features/countries/countriesSlice";
import { fetchFavourites } from "@/lib/features/favourites/favouritesSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CapitalMap from "@/components/CapitalMap";

const CountryPage = () => {
    // 1. Get URL parameters and setup hooks
    const { slug } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useAuth();

    // 2. Get country data from Redux store
    const { selectedCountry, loading, error, countries } = useSelector((state) => state.countries);

    useEffect(() => {
        if (countries.length === 0) {
            dispatch(fetchCountries());
        }
        dispatch(fetchFavourites());
    }, [countries.length, dispatch]);

    // 3. Weather state
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [weatherError, setWeatherError] = useState(null);

    const fetchWeatherData = async (capital) => {
        if (!capital) return;
        setWeatherLoading(true);
        setWeatherError(null);

        try {
            const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPI;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(capital)}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) throw new Error("Weather data not available");

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setWeatherError(err.message);
            console.error("Weather fetch error:", err);
        } finally {
            setWeatherLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCountry?.capital?.[0]) {
            fetchWeatherData(selectedCountry.capital[0]);
        }
    }, [selectedCountry]);

    // 4. Find and set country data from existing store data
    useEffect(() => {
        if (slug && countries.length > 0) {
            const countryName = decodeURIComponent(slug.replace(/-/g, " "));
            const foundCountry = countries.find(
                (country) =>
                    country.name.common.toLowerCase() === countryName.toLowerCase() ||
                    country.name.official.toLowerCase() === countryName.toLowerCase()
            );

            if (foundCountry) dispatch(setSelectedCountry(foundCountry));
            else dispatch(clearSelectedCountry());
        }

        return () => {
            dispatch(clearSelectedCountry());
        };
    }, [slug, countries, dispatch]);

    // 5. Navigation handler
    const handleBack = () => {
        router.push("/countries");
    };

    // 6. Loading state
    if (loading || countries.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography variant="h6">Loading countries data...</Typography>
            </Box>
        );
    }

    // 7. Error state
    if (error) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
                <Typography variant="h6" color="error">
                    Error loading country: {error}
                </Typography>
                <Button variant="contained" onClick={handleBack} startIcon={<ArrowBackIcon />}>
                    Back to Countries
                </Button>
            </Box>
        );
    }

    // 8. No data state
    if (!selectedCountry) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
                <Typography variant="h6">Country not found</Typography>
                <Button variant="contained" onClick={handleBack} startIcon={<ArrowBackIcon />}>
                    Back to Countries
                </Button>
            </Box>
        );
    }

    // 9. Helper functions
    const getLanguages = (country) => {
        if (!country.languages) return "N/A";
        return Object.values(country.languages).join(", ");
    };

    const formatPopulation = (population) => {
        return new Intl.NumberFormat().format(population);
    };

    // 10. Main render
    return (
        <Box sx={{ minWidth: 900, mx: "auto", p: 3 }}>

            <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
                Back to Countries
            </Button> <br></br>

            {user && <FavouriteButton country={selectedCountry} />}

            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4} alignItems="flex-start">
                    {/* 1. Flag and Name */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                                    <Image
                                        width={200}
                                        height={120}
                                        style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
                                        src={selectedCountry.flags?.svg || selectedCountry.flags?.png}
                                        alt={`Flag of ${selectedCountry.name?.common}`}
                                        priority
                                    />
                                    <Typography variant="h5" textAlign="center">
                                        {selectedCountry.name?.common}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 2. Country Details */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: "100%", width: 200 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Country Details
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Population
                                        </Typography>
                                        <Typography variant="body2">{formatPopulation(selectedCountry.population)}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Capital
                                        </Typography>
                                        <Typography variant="body2">{selectedCountry.capital?.join(", ") || "N/A"}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Languages
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            {getLanguages(selectedCountry)
                                                .split(", ")
                                                .map((language, index) => (
                                                    <Chip key={index} label={language} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                                                ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 3. Weather Details */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Weather in {selectedCountry.capital?.[0]}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                {weatherLoading && (
                                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                        <Typography>Loading weather data...</Typography>
                                    </Box>
                                )}

                                {weatherError && (
                                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                        <Typography color="error">{weatherError}</Typography>
                                    </Box>
                                )}

                                {weatherData && !weatherLoading && (
                                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Image
                                                width={60}
                                                height={60}
                                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                                alt={weatherData.weather[0].description}
                                            />
                                            <Box>
                                                <Typography variant="h5">{Math.round(weatherData.main.temp)}°C</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {weatherData.weather[0].main}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="column" gap={1}>
                                            <Typography variant="body2">Humidity: {weatherData.main.humidity}%</Typography>
                                            <Typography variant="body2">Wind: {weatherData.wind.speed} m/s</Typography>
                                            <Typography variant="body2">Feels like: {Math.round(weatherData.main.feels_like)}°C</Typography>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Map */}
                {selectedCountry?.capitalInfo?.latlng && (
                    <Box sx={{ mt: 4 }}>
                        <CapitalMap capital={selectedCountry.capital[0]} latlng={selectedCountry.capitalInfo.latlng} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default CountryPage;
