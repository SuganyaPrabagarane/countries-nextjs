"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";


const Navigation = ({children}) =>{
    const {user, signOut} = useAuth();
    const router = useRouter();

    return (
        <>
            <AppBar position="static" color="gradient" sx={{mb:3}} >
                <Toolbar> 
                    {user && (
                        <Button color="inherit" onClick={() => signOut()}> Logout </Button>
                    )}
                    {!user && (
                        <Button color="inherit" onClick={() => router.push("/login")}> Login </Button>
                    )}
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}

export default Navigation;