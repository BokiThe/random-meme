import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { useClipboard } from 'use-clipboard-copy';

const MemeGenerated = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    const clipboard = useClipboard();
    const [copied, setCopied] = useState(false);

    //copy the link function using useClipboard hook;
    const copyLink = () => {
        clipboard.copy(url);
        setCopied(true);
    }
  return (
    <div className={styles.container}>
        <button onClick={()=> navigate('/')} className={styles.home}>Make More Memes</button>
        {
            url && <img src={url} alt={url} />
        }
        <button onClick={copyLink} className={styles.copy}>{copied ? 'Link copied' : 'Copy link'}</button>
    </div>
  )
}
export default MemeGenerated;