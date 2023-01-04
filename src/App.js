import React from "react";
import GenerateRoutes from "./Core/Services/Routes";
import Headers from "./Layouts/Admin/Header";
import "./App.css";
import AppSnackBar from "./Components/SnackBar";

function App() {

    return (
        <>
            <GenerateRoutes adminLayouts={Headers} />
            <AppSnackBar />
        </>
    );
    
}

export default App;