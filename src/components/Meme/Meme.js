import { React, useEffect, useState} from 'react';
import styles from "./styles.module.css"
 const Meme = () => {
    const [memes, setMemes] = useState([]);
    const [memeIndex , setMemeIndex] = useState(0);


    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(res => {
            const _memes = res.data.memes;
            shuffleMemes(_memes);
            setMemes(_memes);
        })
    }, [])
    
    return (
       memes.length ? 
       <div className={styles.container}>
        <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>skip</button>
        <img src={memes[memeIndex].url} alt="first meme"  />
       </div> 
       : 
       <div>loading</div>
    )
}
export default Meme;