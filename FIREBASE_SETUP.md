# Firebase Authentication Setup Guide

## Overview
This guide will help you set up Firebase Authentication for your BME Fitness website.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **"bme-fitness"**
4. Follow the setup steps
5. Enable Google Analytics (optional)

## Step 2: Enable Authentication

1. In your Firebase project dashboard, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method
5. For Google auth, you'll need to:
   - Add your project domain to authorized domains
   - Add your email for testing

## Step 3: Get Configuration

1. Go to Project Settings (gear icon ⚙️)
2. Scroll down to "Firebase SDK snippet" section (NOT "Admin SDK")
3. Make sure you're in the "General" tab
4. Copy the configuration object from "Firebase SDK snippet" (the first one, not the admin one)
5. It should look like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

**Important**: Use the "Firebase SDK snippet" (first section), NOT the "Admin SDK" (second section)

## Step 4: Update Configuration

1. Open `js/auth.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "bme-fitness.firebaseapp.com",
    projectId: "bme-fitness-13041",
    storageBucket: "bme-fitness-13041.appspot.com",
    messagingSenderId: "679311315243",
    appId: "your-actual-app-id"
};
```

## Step 5: Test Authentication

1. Open your website in a browser
2. Click "Sign In" in the navigation
3. Test both sign-up and sign-in functionality
4. Test Google authentication

## Features Implemented

### Authentication Methods
- ✅ Email/Password sign-in
- ✅ Email/Password sign-up
- ✅ Google sign-in
- ✅ Sign-out functionality

### UI Components
- ✅ Modal authentication form
- ✅ Tab switching (Sign In/Sign Up)
- ✅ User avatar display
- ✅ User dropdown menu
- ✅ Loading states
- ✅ Error handling
- ✅ Success messages

### Security Features
- ✅ Form validation
- ✅ Password requirements (min 6 characters)
- ✅ Session management
- ✅ Protected UI elements

## Customization Options

### Styling
- All auth styles are in `css/auth.css`
- Uses the same gold/black theme as the rest of the site
- Fully responsive design

### User Experience
- Smooth animations and transitions
- Loading spinners during authentication
- Clear error messages
- Success confirmations

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Make sure you've replaced the placeholder config
   - Check that Firebase scripts are loading correctly

2. **Google sign-in not working**
   - Ensure Google auth is enabled in Firebase console
   - Add your domain to authorized domains
   - Check browser console for specific errors

3. **Email sign-in failing**
   - Verify Email/Password auth is enabled
   - Check email format and password requirements
   - Review Firebase console for any security rules

### Debug Mode
To enable debug logging, add this to your browser console:
```javascript
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
```

## Next Steps

After setting up authentication, you can:

1. Add user profile management
2. Implement role-based access (admin/member)
3. Add password reset functionality
4. Connect to Firestore for user data storage
5. Add email verification

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Firebase project settings
3. Ensure all domains are authorized
4. Review the Firebase documentation

## Security Notes

- Never expose your Firebase config in public repositories
- Use environment variables for production deployments
- Enable email verification for better security
- Consider implementing additional security rules in Firebase console
