import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabase";


const initialState = {
    favourites: [],
    loading: false,

};

const getCurrentSession = async () => {
    const { supabase } = await import('../../supabase/supabase');
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    // if (error || !session_token) {
    if (error || !session) {
        throw new Error("No valid authentication session found");
    }

    return session;
}

export const fetchFavourites = createAsyncThunk(
    "favourities/favourities",
    async (_, { rejectWithValue }) => {
        try {
            await getCurrentSession();
            const { supabase } = await import("../../supabase/supabase");
            const { data, error } = await supabase
                .from("favourites") // table name created in supabase
                .select("*") // select all fields and rows
                .order("created_at", { ascending: false }) // order by created_at in descending order

            if (error) throw error;
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);

        }
    }
);

export const addFavourite = createAsyncThunk(
    "favourites/addFavourite",
    async (countryData, { rejectWithValue }) => {
        try {
            const session = await getCurrentSession();
            const { supabase } = await import("../../supabase/supabase");
            const { data, error } = await supabase
                .from("favourites")
                .insert({
                    user_id: session.user.id,
                    //country_name: countryData.name, //field name in the database country_name
                    country_name: countryData.name.common,
                    country_data: countryData, //field name in the database country_data
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);

        }
    }
);

export const removeFavourite = createAsyncThunk(
    "favourites/removeFavourite",
    async (countryName, { rejectWithValue }) => {
        try {
            await getCurrentSession();
            const { supabase } = await import("../../supabase/supabase");
            const { data, error } = await supabase
                .from("favourites")
                .delete()
                .eq("country_name", countryName)

            if (error) throw error;
            return countryName;

        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

// Creating state
const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.favourites = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavourites.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFavourite.fulfilled, (state, action) => {
                state.favourites.push(action.payload);
                state.loading = false;
            })
            .addCase(addFavourite.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFavourite.fulfilled, (state, action) => {
                state.favourites = state.favourites.filter((favourite) => favourite.country_name !== action.payload);
                state.loading = false;
            })
            .addCase(removeFavourite.pending, (state) => {
                state.loading = true;
            });
    },
});

// Provide state
export default favouritesSlice.reducer;
