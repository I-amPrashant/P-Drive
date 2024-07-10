Prashant_Drive

Description
This project is a simplified version of Google Drive, built with React and Firebase. It allows users to upload, view, and manage their files online. The project leverages Firebase Authentication for user authentication and Firebase Storage for storing files. Users can upload files, view a list of their files, and delete files. This project demonstrates the integration of React with Firebase services and provides a user-friendly interface for managing files.

Features
User Authentication with Firebase Authentication
File upload functionality with Firebase Storage
Viewing a list of uploaded files
Deleting files from Firebase Storage
Responsive and user-friendly UI
Prerequisites
Before you can run this project, you need to set up a Firebase project and obtain your Firebase configuration details.

Getting Started
Firebase Setup
Create a Firebase Project:

Go to the Firebase Console.
Click on "Add Project" and follow the setup steps.
Enable Authentication:

In your Firebase project console, navigate to the "Authentication" section.
Click on "Get Started" and enable Email/Password authentication.
Enable Firestore Database:

Go to the "Firestore Database" section.
Click on "Create Database" and follow the setup steps.
Enable Firebase Storage:

Go to the "Storage" section.
Click on "Get Started" and follow the setup steps.
Get Your Firebase Config File:

In the Firebase console, go to your project settings by clicking the gear icon next to "Project Overview".
In the "Your apps" section, click on the web icon (</>) to set up a new web app.
Register the app and click "Register App".
Firebase will provide you with a Firebase config object. Copy this object as you will need it in your React project.
React Project Setup
Clone the Repository

git clone https://github.com/your-username/google-drive-clone.git
cd google-drive-clone

Install Dependencies:

npm install
Add Firebase Config to Your Project:

In the src folder, create a file named firebaseConfig.js.
Paste your Firebase config object into firebaseConfig.js as shown below:
javascript
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;


Start the Development Server:

npm start
Open Your Browser:

Go to http://localhost:3000 to view your Google Drive clone application.