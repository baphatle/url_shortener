import React, { useState } from 'react';
import axios from 'axios';
import "../css/Form.css"


export default function Form() {

    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const handleShorten = async () => {
        try {
            const response = await axios.post('/shorten', { originalUrl });
            setShortUrl(response?.data?.shortUrl);
        } catch (error) {
            console.error('Error shortening the URL', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            setCopySuccess('Copied!');
        }, (err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="app-container">
            <h1>URL Shortener</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter your original URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <button onClick={handleShorten}>Shorten</button>
            </div>

            {shortUrl && (
                <div className="result-container">
                    <input type="text" value={shortUrl} readOnly />
                    <button onClick={handleCopy}>Copy</button>
                    {copySuccess && <p>{copySuccess}</p>}
                </div>
            )}
        </div>
    )
}
