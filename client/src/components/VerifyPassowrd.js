import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams để lấy shortCode, useNavigate để chuyển hướng
import axios from 'axios';
import "../css/Verify.css";

export default function VerifyPassword() {
    const { shortCode } = useParams();  // Lấy shortCode từ URL
    const [password, setPassword] = useState('');  // Quản lý state cho mật khẩu
    const [error, setError] = useState('');  // Quản lý lỗi
    // const navigate = useNavigate();  // Điều hướng người dùng

    const handleVerify = async () => {
        try {
            const response = await axios.post(`/verify/${shortCode}`, { password });
            const { originalUrl } = response.data;
            console.log("RES", response)
            // Chuyển hướng đến original URL
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
                onChange={(e) => setPassword(e?.target?.value)}  // Cập nhật mật khẩu khi người dùng nhập
                required
            />
            <button type="button" onClick={handleVerify}>Verify</button>
            {error && <p className="error-message">{error}</p>}  {/* Hiển thị lỗi nếu có */}
        </div>
    );
}
