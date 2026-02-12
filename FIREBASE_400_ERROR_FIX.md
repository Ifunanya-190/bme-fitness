# 🔥 FIREBASE 400 ERROR FIX

## ⚠️ You MUST Complete This Step

The 400 error you're seeing means **Email/Password authentication is NOT ENABLED** in your Firebase Console.

## 🚀 QUICK FIX (2 minutes):

1. **Go to Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Select your project**: `bme-fitness-13041`
3. **Click "Authentication"** (left sidebar)
4. **Click "Get started"** if you haven't already
5. **Enable Email/Password**:
   - Click **"Email/Password"** 
   - Toggle **"Enable"** to **ON**
   - Click **"Save"**
6. **Enable Google Auth** (optional but recommended):
   - Click **"Google"**
   - Toggle **"Enable"** to **ON**
   - Add **"localhost"** to authorized domains
   - Click **"Save"**

## ✅ AFTER ENABLING:

- ✅ Sign up will work
- ✅ Sign in will work  
- ✅ No more 400 errors
- ✅ Users can create accounts
- ✅ Authentication fully functional

## 🔍 TEST IT:

1. Go to your login page
2. Try creating a new account
3. Try signing in
4. Check browser console (F12) - should see "✅ Firebase initialized successfully"

---

**That's it!** Your authentication will work perfectly after this simple setup.
