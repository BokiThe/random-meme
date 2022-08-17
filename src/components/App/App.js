// import styles from "./styles.module.css";
import Meme from "../Meme/Meme";
import {
    Routes,
    Route,
  } from "react-router-dom";
import MemeGenerated from "../MemeGenerated/MemeGenerated";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Meme />} />
            <Route path="generated" element={<MemeGenerated />} />
        </Routes>
        
    )
}

export default App;