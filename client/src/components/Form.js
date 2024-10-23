import React, { useState } from 'react';
import axios from 'axios';
import "../css/Form.css"

export default function Form() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [customShortUrl, setCustomShortUrl] = useState('');
    const [expirationDays, setExpirationDays] = useState('');
    const [password, setPassword] = useState('');  // Thêm state cho mật khẩu

    const handleShorten = async () => {
        try {
            const response = await axios.post('/shorten', {
                originalUrl,
                password: password || null // Truyền mật khẩu, nếu không có thì truyền null
            });
            setShortUrl(response?.data?.shortUrl);
        } catch (error) {
            console.error('Error shortening the URL', error);
        }
    };

    const handleCustomShortUrl = async () => {
        try {
            const response = await axios.put(`/edit/${shortUrl.split('/').pop()}`, {
                newShortCode: customShortUrl
            });
            setShortUrl(response?.data?.shortUrl);
            setCustomShortUrl('');
        } catch (error) {
            console.error('Error updating short URL', error);
        }
    };

    const handleSetExpiration = async () => {
        try {
            const response = await axios.put(`/expiration/${shortUrl.split('/').pop()}`, {
                days: expirationDays
            });
            console.log('Expiration updated', response?.data);
            setExpirationDays('');
        } catch (error) {
            console.error('Error setting expiration date', error);
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
                {/* Ô input cho mật khẩu, tùy chọn */}
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
                            onChange={(e) => setCustomShortUrl(e.target.value)}
                        />
                        <button onClick={handleCustomShortUrl}>Update</button>
                    </div>

                    <div className="expiration-container">
                        <input
                            type="number"
                            placeholder="Set expiration (days)"
                            value={expirationDays}
                            onChange={(e) => setExpirationDays(e?.target?.value)}
                        />
                        <button onClick={handleSetExpiration}>Set Expiration</button>
                    </div>
                </div>
            )}
        </div>
    );
}
