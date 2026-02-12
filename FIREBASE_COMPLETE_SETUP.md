# 🔥 COMPLETE FIREBASE SETUP GUIDE FOR BME FITNESS

## ⚠️ YOU MUST COMPLETE THESE STEPS FOR AUTH TO WORK!

### Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **bme-fitness-13041**
3. Click **"Authentication"** in left sidebar
4. Click **"Get started"** button
5. Enable **"Email/Password"**:
   - Click "Email/Password" 
   - Toggle "Enable" 
   - Click "Save"
6. Enable **"Google"**:
   - Click "Google"
   - Toggle "Enable"
   - Add your email for testing
   - Under "Authorized domains", add:
     - `localhost` (for local testing)
     - `your-domain.com` (when you deploy)
   - Click "Save"

### Step 2: Test Your Setup

1. Open your website locally
2. Go to `login.html`
3. Open browser console (F12)
4. Look for: "✅ Firebase initialized successfully for BME Fitness"

### Step 3: Create Test Account

1. On login page, click "Sign Up" tab
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"
4. Should see success message

### Step 4: Verify in Firebase Console

1. Go back to Firebase Console
2. Click "Authentication" 
3. Click "Users" tab
4. You should see your test user listed

## 🔍 TROUBLESHOOTING

### If Sign Up Fails:
- Check browser console for errors
- Verify Email/Password auth is enabled
- Make sure password is 6+ characters
- Check email format is valid

### If Google Sign In Fails:
- Verify Google auth is enabled
- Check domain is authorized
- Look for console errors

### If Nothing Works:
- Verify API keys are correct
- Check Firebase project exists
- Make sure you're using correct project

## 📋 QUICK CHECKLIST

- [ ] Firebase project created: bme-fitness-13041
- [ ] API keys copied to js/auth.js ✅
- [ ] Email/Password auth enabled
- [ ] Google auth enabled  
- [ ] Domains authorized (localhost)
- [ ] Test account created
- [ ] Sign in working
- [ ] Sign up working
- [ ] Google auth working

## 🚀 AFTER SETUP

Once authentication works:
- Users can create accounts
- Users can sign in/out
- Google sign-in works
- User data saves to localStorage
- Contact form shows user info when logged in

---

**⏰ This should only take 5-10 minutes to complete!**
