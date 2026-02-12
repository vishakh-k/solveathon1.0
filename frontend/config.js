const API_CONFIG = {
    // Automatically detect environment
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5001'
        : 'https://solveathon1-0-backend.onrender.com'
};
// Ensure HTTPS on production
if (window.location.protocol === 'http:' && !API_CONFIG.BASE_URL.includes('localhost')) {
    console.warn('Production should use HTTPS');
}
