import React from 'react'
import "../css/Verify.css"

export default function VerifyPassowrd() {
    return (
        <div className="verify-container">
            <h2>Enter password to access this URL</h2>
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Verify</button>
        </div>
    );
}
