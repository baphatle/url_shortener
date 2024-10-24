### **URL Shortener**

### **Overview**

The URL Shortener is a simple and efficient web app that lets users convert long URLs into shorter, shareable links. It also provides a redirect service to direct users from the short link to the original URL.

Unlike other shorteners, this app offers added security with password protection, URL expiration, and custom short codes, giving users more control over their links.

### **Why These Technologies?**

I chose **ReactJS**, **ExpressJS**, and **MongoDB** because they provide a modern, scalable, and efficient stack. ReactJS allows us to build responsive and dynamic user interfaces, ExpressJS is a fast and lightweight backend framework, and MongoDB offers flexible, document-based storage that handles the dynamic data requirements of this URL shortener efficiently.

### **Completed Features**

**Core Features:**

- **Original URL Input Form**: Users can submit a long URL that they wish to shorten.
- **Shortened URL Display**: After submitting, users receive a shortened URL.
- **Copy Short URL Button**: A convenient button to copy the shortened URL to the clipboard.

**Optional Features:**

- **Password Protection**: Users can set a password for specific shortened URLs to restrict access.
- **URL Expiry Date**: Users can specify an expiration date for the shortened URLs, allowing them to self-expire after a set period.
- **Custom Short Codes**: Users can create their own custom short codes for their URLs instead of using auto-generated ones.

### **Setup Instructions**

**Server Setup:**

1. Create an .env file.
2. Copy the content from .env.dev and paste it into the .env file.
3. Navigate to the server folder: cd server
4. Install the necessary packages: npm install
5. Start the server: npm start
   
**Client Setup:**
1. Navigate to the client folder: cd client
2. Install the necessary packages: npm install
3. Start the React app: npm start

## **Libraries & Packages**
**Server:**
- **bcrypt**: For password hashing and security.
- **cors**: To enable cross-origin requests.
- **dotenv**: To manage environment variables securely.
- **express**: To create the server and handle routing.
- **jsonwebtoken**: For handling authentication.
- **mongoose**: To interact with MongoDB.
- **nanoid**: For generating unique short codes.

**Client:**
- **axios**: For making API requests.
- **react**: The core library for building the UI.
- **react-dom**: For rendering components in the DOM.
- **react-router & react-router-dom**: For handling client-side routing.
- **react-scripts**: Used for managing the React development environment.
- **web-vitals**: For measuring site performance.
###
###
###
### **Usage Instructions**
1. **Shorten a URL**:
   Enter a long URL into the input field to generate a shortened URL. Optionally, you can add a password for security.
   
   <img width="631" alt="begining" src="https://github.com/user-attachments/assets/9b154241-414b-4d0f-a111-7b37d6d56047">
3. **Customize Short URL**:
   Input a custom string to replace the automatically generated short URL.
   <img width="613" alt="how-to-custom" src="https://github.com/user-attachments/assets/50b45bd4-edd3-4768-a6cb-3999071142a7">
4. **Copy Short URL**:
   Click the "Copy" button to copy the shortened URL to your clipboard.
   <img width="730" alt="Screen Shot 2024-10-23 at 20 18 20" src="https://github.com/user-attachments/assets/cf4f898b-bec9-40ae-a522-448508ed6378">
5. **Set Expiry Date**:
   Enter a positive integer to adjust the expiration date for the shortened URL.
   <img width="631" alt="number-only" src="https://github.com/user-attachments/assets/ee4b6c30-351b-4b4f-86d3-2d4c2f7c27e6">
   <img width="646" alt="set-expiry-successfully" src="https://github.com/user-attachments/assets/f5ffa794-2c54-48ff-afc1-78f0f9b287d9">
6.	**Access Password-Protected URL**:
   If a password was set, enter the password to access the original URL from the shortened one
  <img width="653" alt="wrong-pass" src="https://github.com/user-attachments/assets/c4498761-33a2-4186-b788-9440fefb3e7f">



### **API Endpoints**
If you want to test the live API, replace localhost:6061 with https://url-shortener-s4ws.onrender.com
1. **Shorten URL**
   
   **Method**: POST
   
   **Endpoint**: localhost:6061/shorten

   **Body**:

   { 

   `    `"originalUrl": "https://www.youtube.com/watch?v=4WvX9dBjiJo", 

   `    `"password":"124" // optional

   }

   **Response**:

   { 

   `    `"shortUrl": "localhost:6061/Eu4FDL" 

   }

2. **Redirect**

   **Method**: GET
   
   **Endpoint**: localhost:6061/:shortCode

   **Response**: Redirects to the original URL.

3. **Verify Password**
   
   **Method**: POST
   
   **Endpoint**: localhost:6061/verify/:shortCode

   **Body**:

   {

   `    `"password": "1234" 

   }

   **Response**:

   {

   `    `"originalUrl": "https://www.youtube.com/watch?v=4WvX9dBjiJo"

   }

4. **Custom Short URL**
   
   **Method**: PUT
   
   **Endpoint**: localhost:6061/edit/:shortCode
   
   **Body**:

   { 

   `    `"newShortCode": "anyWord" 

   }

   **Response**:

   {

   `    `"message": "Short URL updated successfully",

   `    `"shortUrl": "localhost:6061/anyWord",

   `    `"originalUrl": "https://www.youtube.com/watch?v=4WvX9dBjiJo"

   }


5. **Edit Expiry Day**
   
   **Method**: PUT
   
   **Endpoint**: localhost:6061/expiration/:shortCode
   
   **Body**:

   {

   `    `"days": 2

   }

   **Response**:

   {

   `    `"message": "Updated expiry day successfully",

   `    `"shortUrl": "localhost:6061/B7YmMZ",

   `    `"expiresAt": "2024-10-25T12:48:07.297Z"

   }

## **Known Issues and Fixes**
- **URL Formatting Error**: If the original URL lacks the protocol (http:// or https://), the browser treats it as a relative path, causing redirection errors (e.g., localhost:6061/youtube.com). This was fixed by ensuring the system automatically adds the correct protocol if it's missing.
- **Expiration Date Miscalculation**: An error occurred when the expiration date was calculated using a string instead of a number. This led to incorrect dates (e.g., jumping to the year 2025). The issue was resolved by ensuring the correct data type (number) is passed to the server.

## **Future Improvements**
- **User Account Registration and Login**: Allow users to register and log in to manage their own shortened URLs.
- **Short URL Management**: Users can:
  - View all URLs they’ve created (including Original URL, Short URL, Password, Expiration Date, and access statistics).
  - Extend the expiration date for their URLs.
  - Delete any of their created short URLs.

## **Live Application**
Visit the deployed version of this project at <https://url-shortener-omega-one.vercel.app/>.

## **Support & Contact Information**
For any questions or support, feel free to reach out via email: **baphatledev@gmail.com**.

###




