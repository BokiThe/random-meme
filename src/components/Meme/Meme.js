import { React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

 const Meme = () => {
    const [memes, setMemes] = useState([]);
    const [memeIndex , setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
    const history = useNavigate(); // instead of useHistory in router v6 useNavigate



    // updaate captions functions that returns the input fields value
    const updateCaptions = (e, i)=>{
        const text = e.target.value || '';
        setCaptions(
            captions.map((cap,index) => {
                if (i === index) {
                    return text
                } else {
                    return cap;
                }
    })
        )
    }
    // generate memes function to send the post req to api to return new image with caaptions on it
    const generateMeme = ()=> {
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        formData.append('username', 'konjshareni');
        formData.append('password', 'konjshareni989');
        formData.append('template_id', currentMeme.id);
        captions.forEach((cap, i) => {
            formData.append(`boxes[${i}][text]`,cap)
        });
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData,
        }).then(res => {
           
            res.json().then(res => {
                history(`/generated?url=${res.data.url}`)
               
            })
        })
    };
    // shuffle memes function to return shufled array of memes on every render
    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

      //handle select function
      const handleSelect = (e)=> {
        e.preventDefault();
        memes.findIndex((curr, i) => curr.name === e.target.value ? setMemeIndex(i) : false)
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
    useEffect(() => {
      if (memes.length) {
        setCaptions(Array(memes[memeIndex].box_count).fill(''));

      } 
    }, [memeIndex, memes])
    
   
    
    return (
       memes.length ? 
       <div className={styles.container}>
         <h4>Fill the descriptions to make your own meme and click <span>generate</span> or just click <span>skip</span> to find meme you want </h4>
        <button onClick={generateMeme} className={styles.generate}>Generate</button>
        <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>skip</button>
            <select name="Select meme" id="selectMeme" value={memes[memeIndex].name} className={styles.caption}  onChange={handleSelect}>
                
            {
                memes.map((meme, i)=>( 
                    <option key={i} id={i} value={meme.name}>{meme.name}</option>
                ))
            }
        </select>
       

        {
            captions.map((cap, i)=>(
   
                <input key={i} className={styles.caption} vaz onChange={(e)=> updateCaptions(e, i)} type="text"  id={`description${i}`} placeholder={`description ${i+1}`} />
            ))
        }
    
            <img src={memes[memeIndex].url} alt={memes[memeIndex].name}   />

       </div> 
       : 
       <div>loading</div>
    )
}
export default Meme;