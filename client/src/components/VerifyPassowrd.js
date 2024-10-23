import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/Verify.css";

export default function VerifyPassword() {
    const { shortCode } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        try {
            const response = await axios.post(`/verify/${shortCode}`, { password });
            const { originalUrl } = response.data;
            console.log("RES", response)
            window.location.href = originalUrl;
        } catch (error) {
            if (error?.response?.status === 403) {
                setError('Incorrect password. Please try again.');
            } else {
                setError('Server error. Please try again later.');
            }
        }
    };

    return (
        <div className="verify-container">
            <h2>Enter password to access this URL</h2>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
                required
            />
            <button type="button" onClick={handleVerify}>Verify</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
