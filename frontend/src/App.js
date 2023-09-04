import { useState } from "react";

import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Main from "./pages/Main";
import LanguageDetails from "./pages/LanguageDetails";
import LanguageCreator from "./pages/LanguageCreator";
import Demo from "./pages/Demo";

function App() {
  // TODO 1: create state for page

  const renderPage = () => {
    // TODO 9: render LanguageDetails page in case of "/languages/:langId"
    
    // TODO 7: render pages: "main", "about", "demo", "language-creator", "error"
    return (<>
    </>);
  };

  return (
    
  <div className="App">
    {/* TODO 2: implement Layout visible on all pages */}
    {renderPage()}
  </div>
  )
}

export default App;
