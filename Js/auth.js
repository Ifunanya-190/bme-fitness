// Firebase Authentication - Backend Integration
// Updated with actual BME Fitness project details
const firebaseConfig = {
    apiKey: "AIzaSyA3kuIdnThCQRbAVdiTQobvDVB84J72oSk",
    authDomain: "bme-fitness-13041.firebaseapp.com",
    projectId: "bme-fitness-13041",
    storageBucket: "bme-fitness-13041.firebasestorage.app",
    messagingSenderId: "679311315243",
    appId: "1:679311315243:web:8d3f2cac67e8346a40356e",
    measurementId: "G-87ZECSSEFZ"
};

// Initialize Firebase only if config is available
let auth = null;

// Check if Firebase is available and config has real values
if (typeof firebase !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.apiKey !== "your-api-key-here") {
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        console.log('✅ Firebase initialized successfully for BME Fitness');
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        // Show error to user
        if (typeof showError === 'function') {
            showError('Firebase configuration error. Please check your API keys.');
        }
    }
} else {
    console.warn('⚠️ Firebase not initialized - missing API keys or Firebase SDK');
    // Show error to user on login page
    if (typeof showError === 'function') {
        showError('Firebase not configured. Please set up your Firebase project.');
    }
}

// Auth state listener
function setupAuthStateListener() {
    if (!auth) return;
    
    auth.onAuthStateChanged(user => {
        if (user) {
            showUserMenu(user);
            saveUserToDatabase(user);
        } else {
            showAuthButton();
        }
    });
}

// Save user to database (localStorage for now, upgrade to Firestore later)
function saveUserToDatabase(user) {
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        membershipStatus: 'free'
    };
    
    localStorage.setItem('bme_user', JSON.stringify(userData));
}

// Sign In function
async function signIn() {
    if (!auth) {
        showError('Firebase not configured. Please set up your Firebase project.');
        return;
    }
    
    const email = document.getElementById('signinEmail')?.value;
    const password = document.getElementById('signinPassword')?.value;
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    showLoading('signin', true);
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showSuccess('Successfully signed in!');
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        handleAuthError(error);
    } finally {
        showLoading('signin', false);
    }
}

// Sign Up function
async function signUp() {
    if (!auth) {
        showError('Firebase not configured. Please set up your Firebase project.');
        return;
    }
    
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const password = document.getElementById('signupPassword')?.value;
    
    if (!name || !email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    showLoading('signup', true);
    
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({ displayName: name });
        showSuccess('Account created successfully!');
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        handleAuthError(error);
    } finally {
        showLoading('signup', false);
    }
}

// Google Sign In
async function signInWithGoogle() {
    if (!auth) {
        showError('Firebase not configured. Please set up your Firebase project.');
        return;
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
        await auth.signInWithPopup(provider);
        showSuccess('Successfully signed in with Google!');
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        handleAuthError(error);
    }
}

// Sign Out
async function signOut() {
    try {
        if (auth) {
            await auth.signOut();
        }
        localStorage.removeItem('bme_user');
        showSuccess('Successfully signed out!');
    } catch (error) {
        showError('Error signing out');
    }
}

// UI Functions for login.html only
function switchTab(tab) {
    if (!window.location.pathname.includes('login.html')) return;
    
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    const footerText = document.getElementById('authFooterText');
    const footerLink = document.getElementById('authFooterLink');
    
    if (!signinForm || !signupForm) return;
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'signin') {
        signinForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
        if (footerText) footerText.textContent = "Don't have an account?";
        if (footerLink) {
            footerLink.textContent = "Sign Up";
            footerLink.onclick = () => switchTab('signup');
        }
    } else {
        signupForm.classList.add('active');
        signinForm.classList.remove('active');
        tabs[1].classList.add('active');
        if (footerText) footerText.textContent = "Already have an account?";
        if (footerLink) {
            footerLink.textContent = "Sign In";
            footerLink.onclick = () => switchTab('signin');
        }
    }
}

function showLoading(form, show) {
    const btnText = document.getElementById(form + 'BtnText');
    const loading = document.getElementById(form + 'Loading');
    const btn = btnText?.parentElement;
    
    if (!btn || !btnText || !loading) return;
    
    if (show) {
        btnText.style.display = 'none';
        loading.style.display = 'block';
        btn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        loading.style.display = 'none';
        btn.disabled = false;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    if (successDiv) successDiv.style.display = 'none';
    
    setTimeout(() => {
        if (errorDiv) errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
    if (errorDiv) errorDiv.style.display = 'none';
    
    setTimeout(() => {
        if (successDiv) successDiv.style.display = 'none';
    }, 5000);
}

function handleAuthError(error) {
    let message = 'An error occurred';
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'No account found with this email';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password';
            break;
        case 'auth/email-already-in-use':
            message = 'An account already exists with this email';
            break;
        case 'auth/weak-password':
            message = 'Password should be at least 6 characters';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address';
            break;
        default:
            message = error.message;
    }
    
    showError(message);
}

function clearForms() {
    const signinEmail = document.getElementById('signinEmail');
    const signinPassword = document.getElementById('signinPassword');
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    
    if (signinEmail) signinEmail.value = '';
    if (signinPassword) signinPassword.value = '';
    if (signupName) signupName.value = '';
    if (signupEmail) signupEmail.value = '';
    if (signupPassword) signupPassword.value = '';
    
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

function showUserMenu(user) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Remove existing auth button if exists
    const existingAuthBtn = navLinks.querySelector('.btn');
    if (existingAuthBtn) {
        existingAuthBtn.remove();
    }
    
    // Create user menu with Font Awesome person icon
    const userName = user.displayName || user.email.split('@')[0] || 'User';
    const userMenuHTML = `
        <div class="user-menu">
            <div class="user-avatar" onclick="toggleUserDropdown()">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-dropdown" id="userDropdown">
                <div class="user-greeting">👋 Hello, ${userName}</div>
                <hr>
                <a href="#" onclick="viewProfile()"><i class="fas fa-user"></i> My Profile</a>
                <a href="#" onclick="viewMembership()"><i class="fas fa-crown"></i> Membership</a>
                <a href="#" onclick="viewSchedule()"><i class="fas fa-calendar"></i> My Schedule</a>
                <a href="#" onclick="viewProgress()"><i class="fas fa-chart-line"></i> Progress</a>
                <hr>
                <a href="#" onclick="signOut()"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </div>
        </div>
    `;
    
    navLinks.insertAdjacentHTML('beforeend', userMenuHTML);
}

function showAuthButton() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Remove existing user menu if exists
    const existingUserMenu = navLinks.querySelector('.user-menu');
    if (existingUserMenu) {
        existingUserMenu.remove();
    }
    
    // Add sign up button if not exists
    if (!navLinks.querySelector('.btn')) {
        const authBtn = document.createElement('a');
        authBtn.href = 'login.html';
        authBtn.className = 'btn';
        authBtn.textContent = 'Sign Up';
        navLinks.appendChild(authBtn);
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');
    
    if (userMenu && !userMenu.contains(event.target)) {
        if (dropdown) dropdown.classList.remove('active');
    }
});

// User menu functions
function viewProfile() {
    event.preventDefault();
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');
    
    // Redirect to profile page
    window.location.href = 'profile.html';
}

function viewMembership() {
    event.preventDefault();
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');
    
    // Redirect to membership page
    window.location.href = 'pricing.html';
}

function viewSchedule() {
    event.preventDefault();
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');
    
    // Redirect to schedule page
    window.location.href = 'schedule.html';
}

function viewProgress() {
    event.preventDefault();
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');
    
    // Redirect to progress page
    window.location.href = 'progress.html';
}

// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-icon');
    
    if (passwordInput && icon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupAuthStateListener();
    
    // Set default tab for login page
    if (window.location.pathname.includes('login.html')) {
        switchTab('signin');
    }
});

// Export functions for global access
window.signIn = signIn;
window.signUp = signUp;
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
window.switchTab = switchTab;
window.toggleUserDropdown = toggleUserDropdown;
window.viewProfile = viewProfile;
window.viewMembership = viewMembership;
window.viewSchedule = viewSchedule;
window.viewProgress = viewProgress;
window.togglePassword = togglePassword;
