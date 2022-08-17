// import styles from "./styles.module.css";
import Meme from "../Meme/Meme";
import {
    Routes,
    Route,
  } from "react-router-dom";
import MemeGenerated from "../MemeGenerated/MemeGenerated";
import styles from './styles.module.css'
const App = () => {
    return (
        <div className={styles.app}>   
            <h1>WELCOME TO MEME CREATOR</h1>
            

            <Routes>
                <Route path="/" element={<Meme />} />
                <Route path="generated" element={<MemeGenerated />} />
            </Routes>
            
        </div>
    )
}

export default App;