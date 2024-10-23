import React, { useState } from 'react';
import axios from 'axios';
import "../css/Form.css"

export default function Form() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [customShortUrl, setCustomShortUrl] = useState('');
    const [expirationDays, setExpirationDays] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleShorten = async () => {
        try {
            const response = await axios.post('https://url-shortener-s4ws.onrender.com/shorten', {
                originalUrl,
                password: password || null
            });
            setShortUrl(response?.data?.shortUrl);
        } catch (error) {
            console.error('Error shortening the URL', error);
        }
    };

    const handleCustomShortUrl = async () => {
        console.log('Type of customShortUrl:', typeof customShortUrl);
        if (!shortUrl || !customShortUrl) {
            setErrorMessage('Short URL or custom short URL is empty');
            return;
        }

        try {
            const response = await axios.put(`https://url-shortener-s4ws.onrender.com/edit/${shortUrl.split('/').pop()}`, {
                newShortCode: customShortUrl
            });
            setShortUrl(response?.data?.shortUrl);
            setCustomShortUrl('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating short URL', error);
            setErrorMessage('Failed to update short URL');
        }
    };


    const handleSetExpiration = async () => {
        const parsedDays = parseInt(expirationDays, 10);

        if (isNaN(parsedDays) || parsedDays <= 0) {
            setErrorMessage('Please enter a positive number greater than 0');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.put(`https://url-shortener-s4ws.onrender.com/expiration/${shortUrl.split('/').pop()}`, {
                days: parsedDays
            });
            console.log('Expiration updated', response?.data);
            setExpirationDays('');
            setErrorMessage('');
            setSuccessMessage('Expiration date updated successfully!');
        } catch (error) {
            console.error('Error setting expiration date', error);
            setErrorMessage('Failed to update expiration date');
            setSuccessMessage('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Copied!');
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
                    onChange={(e) => setOriginalUrl(e?.target?.value)}
                />
                <input
                    type="password"
                    placeholder="Optional password (to protect short URL)"
                    value={password}
                    onChange={(e) => setPassword(e?.target?.value)}
                />
                <button onClick={handleShorten}>Shorten</button>
            </div>

            {shortUrl && (
                <div className="result-container">
                    <input type="text" value={shortUrl} readOnly />
                    <button onClick={handleCopy}>Copy</button>

                    <div className="custom-container">
                        <input
                            type="text"
                            placeholder="Custom short URL"
                            value={customShortUrl}
                            onChange={(e) => setCustomShortUrl(e?.target?.value)}
                        />
                        <button onClick={handleCustomShortUrl}>Update</button>
                    </div>

                    <div className="expiration-container">
                        <input
                            type="text"
                            placeholder="Set expiration (days)"
                            value={expirationDays}
                            onChange={(e) => setExpirationDays(e?.target?.value)}
                        />
                        <button onClick={handleSetExpiration}>Set Expiration</button>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
