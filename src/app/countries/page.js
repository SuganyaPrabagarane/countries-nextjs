"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import { CardContent, Grid, Typography, Card, CardActionArea, TextField, InputAdornment, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

const Countries = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    //First countries comes from store.js file, second countries comes from countriesSlice.js under initialState
    const countries = useSelector((state) => state.countries.countries);
    console.log("Countries:", countries);

    const handleCountryClick = (countryName) => {
        // Create URL-friendly slug
        const slug = countryName.toLowerCase().replace(/\s+/g, "-");
        router.push(`/countries/${encodeURIComponent(slug)}`);
    };

    useEffect(() => {
        dispatch(fetchCountries());

    }, [dispatch])

    const getCurrencies = (country) => {
        if (!country.currencies) return NaN;
        return Object.values(country.currencies)
            .map((currency) => `${currency.name} (${currency.symbol})`)
            .join(",")
    }



    return (
        <>
            {/* <h1>Countries</h1> */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: "100%",
                    py: 4,
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    sx={{
                        width: 600,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid
                container spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {countries.map(country => (
                    <Card key={country.name.common} sx={{ width: "300px", height: "250px" }} >
                        <CardActionArea onClick={() => handleCountryClick(country.name.common)} >
                            <CardContent>
                                <img src={country.flags.svg} alt="flag" width={100} height={50} style={{ objectFit: "cover" }} />
                                <Typography variant="h5">{country.name.common}</Typography>
                                <Typography variant="h6"> {country.population}  </Typography>
                                <Typography variant="h6">{getCurrencies(country)}</Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                ))}
            </Grid >

        </>
    )
}

export default Countries;