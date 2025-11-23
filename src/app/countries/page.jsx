"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect, useState } from "react";
import { CardContent, Grid, Typography, Card, CardActionArea, TextField, InputAdornment, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

const Countries = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");

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

    const filteredCounteries = countries.filter((country) => {
        const searchCountry = country.name.common.toLowerCase().includes(search.toLowerCase());
        const filterByRegion = region === "" || country.region === region;

        return searchCountry && filterByRegion;
    })

    const regions = [...new Set(countries.map((country) => country.region).filter(Boolean).sort())];



    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                sx={{
                    width: "100%",
                    py: 4,
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        width: 400,
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

                <FormControl size="small" sx={{ width: 200 }}>
                    <InputLabel>Region</InputLabel>
                    <Select
                        value={region}
                        label="Region"
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <MenuItem value="">All Regions</MenuItem>

                        {regions.map((region) => (
                            <MenuItem key={region} value={region}>
                                {region}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid
                container spacing={4}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {filteredCounteries.map(country => (
                    <Card key={country.name.common} sx={{ width: "280px", height: "260px" }} >
                        <CardActionArea onClick={() => handleCountryClick(country.name.common)} >
                            <CardContent>
                                <img src={country.flags.svg} alt="flag" width={150} height={55} style={{ objectFit: "cover" , borderRadius:'5px', paddingBottom:'10px'}} />
                                <Typography variant="h5">{country.name.common}</Typography>
                                <Typography variant="h6"> {country.population}  </Typography>
                                <Typography variant="h6">{getCurrencies(country)}</Typography>
                                <Typography variant="h6"> ({country.region})  </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                ))}
            </Grid >

        </>
    )
}

export default Countries;