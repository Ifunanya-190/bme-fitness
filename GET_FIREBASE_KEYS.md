# 🔥 HOW TO GET FIREBASE API KEYS FOR BME FITNESS

## Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bme-fitness-13041**
3. If you don't see it, click "Add project" and create it

## Step 2: Get Your API Keys
1. Click the **⚙️ Settings gear** icon (top left)
2. Select **Project settings**
3. In the **General** tab, scroll down to **"Your apps"** section
4. If you don't see an app, click **"Add app"** → **Web** → give it a nickname
5. Click on the **Web app** you just created
6. Copy the **Firebase SDK snippet** - it contains all your keys!

## Step 3: Find Your Specific Keys
Your Firebase config should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCxxxxxxxxxxxxxxxxxxxxxxxxxxx",  // ← THIS IS YOUR API KEY
  authDomain: "bme-fitness-13041.firebaseapp.com",
  projectId: "bme-fitness-13041",
  storageBucket: "bme-fitness-13041.appspot.com",
  messagingSenderId: "679311315243",
  appId: "1:1234567890:web:abcdef123456"  // ← THIS IS YOUR APP ID
};
```

## Step 4: Update Your Code
Replace the content in `js/auth.js` with your actual keys:

```javascript
// Firebase Authentication - Backend Integration
// Updated with actual BME Fitness project details
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY_HERE",  // ← PASTE YOUR API KEY
    authDomain: "bme-fitness-13041.firebaseapp.com",
    projectId: "bme-fitness-13041", 
    storageBucket: "bme-fitness-13041.appspot.com",
    messagingSenderId: "679311315243",
    appId: "YOUR_ACTUAL_APP_ID_HERE"  // ← PASTE YOUR APP ID
};
```

## Step 5: Enable Authentication Methods
1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Enable **"Email/Password"** sign-in method
4. Enable **"Google"** sign-in method
5. For Google auth:
   - Add your domain to authorized domains
   - Add your email for testing

## 🔧 COMMON SIGN IN/SIGN UP ISSUES & FIXES

### Issue 1: "Firebase not initialized" Error
**Fix:** Make sure you replaced the placeholder API keys

### Issue 2: Google Sign-in Not Working
**Fix:** 
- Enable Google auth in Firebase Console
- Add your domain to authorized domains
- Check browser console for specific errors

### Issue 3: Email Sign-in Failing
**Fix:**
- Verify Email/Password auth is enabled
- Check email format and password requirements
- Review Firebase console for security rules

### Issue 4: Forms Not Submitting
**Fix:** Check that all required fields are filled and valid

## 🚀 QUICK SETUP CHECKLIST

- [ ] Got API key from Firebase Console
- [ ] Got App ID from Firebase Console  
- [ ] Updated `js/auth.js` with real keys
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Added domain to authorized domains
- [ ] Tested sign-in functionality
- [ ] Tested sign-up functionality
- [ ] Tested Google sign-in

## 📞 NEED HELP?

If you're stuck:
1. Check browser console (F12) for error messages
2. Verify Firebase project settings
3. Ensure all domains are authorized
4. Review the Firebase documentation

## 🔗 USEFUL LINKS

- [Firebase Console](https://console.firebase.google.com/)
- [Your Project](https://console.firebase.google.com/project/bme-fitness-13041/authentication)
- [Authentication Setup](https://firebase.google.com/docs/auth/web/start)

---

**⚠️ IMPORTANT:** Never share your API keys publicly! Only use them in your local development environment.
