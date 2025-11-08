// Configuration
const API_URL = 'http://localhost:5000';
let currentStream = null;
let currentReportFormat = 'pdf';
let lastAnalysisResult = null;

// ========================================
// UNIVERSE BACKGROUND ANIMATION
// ========================================

function createUniverseBackground() {
    console.log('Creating universe background...');
    
    // Create stars layer container
    const starsLayer = document.createElement('div');
    starsLayer.className = 'stars-layer';
    document.body.appendChild(starsLayer);
    
    // Create multiple layers of stars for depth effect with movement
    createStarLayer(starsLayer, 250, 'small', 1);
    createStarLayer(starsLayer, 120, 'medium', 2);
    createStarLayer(starsLayer, 60, 'large', 3);
    
    // Create shooting stars
    createShootingStars(starsLayer, 5);
    
    // Create nebula effects
    createNebulas();
    
    // Create floating planets
    createPlanets();
    
    // Create spiral galaxies
    createGalaxies();
    
    // Create comets
    createComets();
    
    console.log('Universe background created!');
}

function createStarLayer(container, count, size, zIndex) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = `star ${size}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Add variation to movement
        const duration = 60 + Math.random() * 40; // 60-100s
        star.style.animationDuration = `3s, ${duration}s`;
        
        star.style.zIndex = zIndex;
        container.appendChild(star);
    }
}

function createShootingStars(container, count) {
    for (let i = 0; i < count; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animationDelay = Math.random() * 10 + 's';
        shootingStar.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(shootingStar);
    }
}

function createNebulas() {
    const nebulaColors = [
        'rgba(102, 126, 234, 0.4)',
        'rgba(118, 75, 162, 0.3)',
        'rgba(236, 72, 153, 0.3)',
        'rgba(79, 172, 254, 0.25)'
    ];
    
    for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.className = `nebula nebula-${i + 1}`;
        document.body.appendChild(nebula);
    }
}

function createPlanets() {
    const planetConfigs = [
        { gradient: 'radial-gradient(circle at 30% 30%, #f093fb, #764ba2)', size: 80 },
        { gradient: 'radial-gradient(circle at 30% 30%, #4facfe, #00f2fe)', size: 60 },
        { gradient: 'radial-gradient(circle at 30% 30%, #667eea, #764ba2)', size: 100 }
    ];
    
    for (let i = 0; i < 3; i++) {
        const planet = document.createElement('div');
        planet.className = `planet planet-${i + 1}`;
        document.body.appendChild(planet);
    }
}

function createGalaxies() {
    console.log('Creating spiral galaxies...');
    
    for (let i = 0; i < 3; i++) {
        const galaxy = document.createElement('div');
        galaxy.className = `galaxy galaxy-${i + 1}`;
        
        // Create galaxy core
        const core = document.createElement('div');
        core.className = 'galaxy-core';
        galaxy.appendChild(core);
        
        // Create galaxy arms container
        const armsContainer = document.createElement('div');
        armsContainer.className = 'galaxy-arm';
        
        // Create 5 spiral arms
        for (let j = 0; j < 5; j++) {
            const arm = document.createElement('div');
            arm.className = `spiral-arm spiral-arm-${j + 1}`;
            armsContainer.appendChild(arm);
        }
        
        galaxy.appendChild(armsContainer);
        
        // Add star clusters to galaxy
        const clusterCount = 20 + Math.floor(Math.random() * 20);
        for (let k = 0; k < clusterCount; k++) {
            const cluster = document.createElement('div');
            cluster.className = 'star-cluster';
            
            // Position clusters in circular pattern
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 60; // 20-80% from center
            const x = 50 + Math.cos(angle) * distance;
            const y = 50 + Math.sin(angle) * distance;
            
            cluster.style.left = x + '%';
            cluster.style.top = y + '%';
            cluster.style.animationDelay = Math.random() * 3 + 's';
            
            galaxy.appendChild(cluster);
        }
        
        document.body.appendChild(galaxy);
    }
    
    console.log('Galaxies created!');
}

function createComets() {
    console.log('Creating comets...');
    
    const cometCount = 3;
    for (let i = 0; i < cometCount; i++) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        
        // Random starting position (top-right area)
        comet.style.left = (60 + Math.random() * 40) + '%';
        comet.style.top = Math.random() * 30 + '%';
        
        // Stagger animation delays
        comet.style.animationDelay = (i * 5) + 's';
        comet.style.animationDuration = (12 + Math.random() * 6) + 's';
        
        document.body.appendChild(comet);
    }
    
    console.log('Comets created!');
}


// ========================================
// DOM REFERENCES & INITIALIZATION
// ========================================

// Cached DOM references (assigned on init)
let startCameraBtn;
let stopCameraBtn;
let captureBtn;
let uploadBtn;
let fileInput;
let videoFeed;
let cameraPlaceholder;
let cameraOverlay;
let loadingOverlay;
let initialState;
let resultsDisplay;
let reportFormatButtons = [];
let generateReportBtn;
let filterButtons = [];

// Current state
let currentFilter = 'none';

// Emotion emoji mapping
const emotionEmojis = {
    'HAPPY': '😊',
    'SAD': '😢',
    'ANGRY': '😠',
    'SURPRISED': '😲',
    'CALM': '😌',
    'CONFUSED': '😕',
    'DISGUSTED': '🤢',
    'FEAR': '😨',
    'UNCERTAIN': '🤔'
};

// Initialize
function initializeUI() {
    console.log('=== Initializing UI ===');
    console.log('DOM ready state:', document.readyState);
    
    // Create universe background first
    createUniverseBackground();
    
    // Query DOM elements when the DOM is ready
    startCameraBtn = document.getElementById('start-camera-btn');
    stopCameraBtn = document.getElementById('stop-camera-btn');
    captureBtn = document.getElementById('capture-btn');
    uploadBtn = document.getElementById('upload-btn');
    fileInput = document.getElementById('file-input');
    videoFeed = document.getElementById('video-feed');
    cameraPlaceholder = document.getElementById('camera-placeholder');
    cameraOverlay = document.getElementById('camera-overlay');
    loadingOverlay = document.getElementById('loading-overlay');
    initialState = document.getElementById('initial-state');
    resultsDisplay = document.getElementById('results-display');
    generateReportBtn = document.getElementById('generate-report-btn');
    
    reportFormatButtons = Array.from(document.querySelectorAll('[data-format]'));
    filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    
    console.log('Found', reportFormatButtons.length, 'report format buttons');
    console.log('Found', filterButtons.length, 'filter buttons');

    setupEventListeners();
    checkCameraSupport();

    // Ensure UI matches initial state
    console.log('Initial report format:', currentReportFormat);
    console.log('Initial filter:', currentFilter);
    updateReportFormatUI();
    updateFilterUI();
    
    console.log('=== UI Initialized ===');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUI);
} else {
    initializeUI();
}

// Update Report Format UI
function updateReportFormatUI() {
    if (!reportFormatButtons || reportFormatButtons.length === 0) return;
    
    console.log('Updating report format UI to:', currentReportFormat);
    
    reportFormatButtons.forEach(btn => {
        const isActive = btn.dataset.format === currentReportFormat;
        if (isActive) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

// Update Filter UI
function updateFilterUI() {
    if (!filterButtons || filterButtons.length === 0) return;
    
    console.log('Updating filter UI to:', currentFilter);
    
    filterButtons.forEach(btn => {
        const isActive = btn.dataset.filter === currentFilter;
        if (isActive) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Apply filter to video feed
    if (videoFeed) {
        // Remove all filter classes
        videoFeed.className = videoFeed.className.split(' ').filter(c => !c.startsWith('filter-')).join(' ');
        // Add new filter class
        videoFeed.classList.add('filter-' + currentFilter);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    console.log('Report format buttons:', reportFormatButtons.length);
    
    startCameraBtn.addEventListener('click', startCamera);
    stopCameraBtn.addEventListener('click', stopCamera);
    captureBtn.addEventListener('click', captureAndAnalyze);
    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });
    fileInput.addEventListener('change', handleFileUpload);

    // Report format buttons
    reportFormatButtons.forEach(btn => {
        console.log('Adding listener to format button:', btn.dataset.format);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const value = this.dataset.format;
            console.log('Format button clicked:', value);
            
            if (!value) return;
            
            currentReportFormat = value;
            updateReportFormatUI();
            showNotification(`Report format set to ${currentReportFormat.toUpperCase()}`, 'success');
        });
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        console.log('Adding listener to filter button:', btn.dataset.filter);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const value = this.dataset.filter;
            console.log('Filter button clicked:', value);
            
            if (!value) return;
            
            currentFilter = value;
            updateFilterUI();
            
            const filterName = value === 'none' ? 'None' : this.textContent.trim();
            showNotification(`Filter applied: ${filterName}`, 'success');
        });
    });

    // Generate report button
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateReport);
    }
}

// Check Camera Support
function checkCameraSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showNotification('Camera not supported on this browser', 'error');
        startCameraBtn.disabled = true;
    }
}

// Start Camera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        currentStream = stream;
        videoFeed.srcObject = stream;
        
        // Update UI
        cameraPlaceholder.classList.add('hidden');
        videoFeed.classList.remove('hidden');
        cameraOverlay.classList.remove('hidden');
        startCameraBtn.classList.add('hidden');
        stopCameraBtn.classList.remove('hidden');
        captureBtn.disabled = false;

        // Apply current filter
        updateFilterUI();

        showNotification('Camera started successfully!', 'success');
    } catch (error) {
        console.error('Camera error:', error);
        showNotification('Failed to access camera. Please check permissions.', 'error');
    }
}

// Stop Camera
function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }

    videoFeed.srcObject = null;
    videoFeed.classList.add('hidden');
    cameraPlaceholder.classList.remove('hidden');
    cameraOverlay.classList.add('hidden');
    startCameraBtn.classList.remove('hidden');
    stopCameraBtn.classList.add('hidden');
    captureBtn.disabled = true;

    showNotification('Camera stopped', 'info');
}

// Capture and Analyze
async function captureAndAnalyze() {
    if (!currentStream) {
        showNotification('Please start the camera first', 'error');
        return;
    }

    // Create canvas to capture frame
    const canvas = document.createElement('canvas');
    canvas.width = videoFeed.videoWidth;
    canvas.height = videoFeed.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoFeed, 0, 0);

    // Convert to blob
    canvas.toBlob(async (blob) => {
        await analyzeImage(blob);
    }, 'image/jpeg', 0.9);
}

// Handle File Upload
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }

    await analyzeImage(file);
}

// Analyze Image
async function analyzeImage(imageBlob) {
    try {
        showLoading(true);

        // Convert blob to base64
        const base64 = await blobToBase64(imageBlob);
        
        // Check if auto-send to n8n is enabled
        const autoSendN8N = document.getElementById('n8n-auto-send').checked;
        
        // Call API
        const response = await fetch(`${API_URL}/detect-emotion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64.split(',')[1], // Remove data:image/jpeg;base64, prefix
                sensitivity: 'high', // Use high sensitivity by default
                send_to_n8n: autoSendN8N // Auto-send to n8n if enabled
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success) {
            // Store the analysis result
            lastAnalysisResult = {
                ...data,
                timestamp: new Date().toISOString(),
                image: base64
            };
            
            // Enable report generation and n8n send button
            if (generateReportBtn) {
                generateReportBtn.disabled = false;
            }
            document.getElementById('send-to-n8n-btn').disabled = false;
            
            displayResults(data);
            showNotification('Analysis complete!', 'success');
            
            // Show n8n integration result if auto-send was enabled
            if (autoSendN8N && data.n8n_integration) {
                const n8nStatusEl = document.getElementById('n8n-status');
                n8nStatusEl.style.display = 'block';
                
                if (data.n8n_integration.success) {
                    n8nStatusEl.className = 'success';
                    n8nStatusEl.textContent = '✅ Auto-sent to n8n workflow successfully!';
                } else {
                    n8nStatusEl.className = 'error';
                    n8nStatusEl.textContent = '❌ n8n auto-send failed: ' + data.n8n_integration.error;
                }
                
                setTimeout(() => {
                    n8nStatusEl.style.display = 'none';
                }, 5000);
            }
        } else {
            throw new Error(data.error || 'Analysis failed');
        }

    } catch (error) {
        console.error('Analysis error:', error);
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// Display Results
function displayResults(data) {
    // Hide initial state, show results
    initialState.classList.add('hidden');
    resultsDisplay.classList.remove('hidden');

    // Primary emotion
    const emoji = emotionEmojis[data.primary_emotion] || '😐';
    document.getElementById('emotion-emoji').textContent = emoji;
    document.getElementById('emotion-label').textContent = data.primary_emotion || 'UNKNOWN';
    document.getElementById('emotion-confidence').textContent = `${data.confidence}% Confidence`;

    // Emotion bars
    const emotionBars = document.getElementById('emotion-bars');
    emotionBars.innerHTML = '';

    data.all_emotions.forEach((emotion, index) => {
        const bar = document.createElement('div');
        bar.className = 'emotion-bar';
        bar.innerHTML = `
            <div class="emotion-bar-header">
                <span>${emotionEmojis[emotion.emotion] || '😐'} ${emotion.emotion}</span>
                <span>${emotion.confidence}%</span>
            </div>
            <div class="emotion-bar-track">
                <div class="emotion-bar-fill ${emotion.emotion.toLowerCase()}" 
                     style="width: 0%"
                     data-width="${emotion.confidence}%"></div>
            </div>
        `;
        emotionBars.appendChild(bar);
    });

    // Animate bars
    setTimeout(() => {
        document.querySelectorAll('.emotion-bar-fill').forEach(fill => {
            fill.style.width = fill.dataset.width;
        });
    }, 100);

    // Face details
    if (data.face_details) {
        const faceDetails = document.getElementById('face-details');
        faceDetails.innerHTML = '';

        const details = [
            {
                label: '👤 Age Range',
                value: data.face_details.age_range ? 
                    `${data.face_details.age_range.Low} - ${data.face_details.age_range.High} years` : 
                    'N/A'
            },
            {
                label: '⚧️ Gender',
                value: data.face_details.gender ? 
                    `${data.face_details.gender.Value} (${data.face_details.gender.Confidence.toFixed(1)}%)` : 
                    'N/A'
            },
            {
                label: '😄 Smile',
                value: data.face_details.smile ? 
                    `${data.face_details.smile.Value ? 'Yes' : 'No'} (${data.face_details.smile.Confidence.toFixed(1)}%)` : 
                    'N/A'
            },
            {
                label: '👓 Eyeglasses',
                value: data.face_details.eyeglasses ? 
                    `${data.face_details.eyeglasses.Value ? 'Yes' : 'No'} (${data.face_details.eyeglasses.Confidence.toFixed(1)}%)` : 
                    'N/A'
            }
        ];

        details.forEach(detail => {
            const item = document.createElement('div');
            item.style.cssText = 'padding: 0.8rem; background: rgba(255,255,255,0.05); border-radius: 10px;';
            item.innerHTML = `
                <div style="opacity: 0.7; font-size: 0.9rem; margin-bottom: 0.3rem;">${detail.label}</div>
                <div style="font-weight: 600; font-size: 1.1rem;">${detail.value}</div>
            `;
            faceDetails.appendChild(item);
        });
    }
}

// Helper: Blob to Base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Show Loading
function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

// Show Notification (simple alert for now)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// REPORT GENERATION FUNCTIONS
// ========================================

function generateReport() {
    if (!lastAnalysisResult) {
        showNotification('No analysis data available. Please analyze an image first.', 'error');
        return;
    }

    console.log('Generating report in format:', currentReportFormat);
    
    try {
        switch(currentReportFormat) {
            case 'pdf':
                generatePDFReport();
                break;
            case 'json':
                generateJSONReport();
                break;
            case 'csv':
                generateCSVReport();
                break;
            default:
                showNotification('Invalid format selected', 'error');
        }
    } catch (error) {
        console.error('Report generation error:', error);
        showNotification('Failed to generate report: ' + error.message, 'error');
    }
}

function generatePDFReport() {
    // Create HTML content for PDF
    const timestamp = new Date(lastAnalysisResult.timestamp).toLocaleString();
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Emotion Analysis Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #667eea;
                    margin: 0;
                }
                .section {
                    margin: 30px 0;
                }
                .section h2 {
                    color: #4f46e5;
                    border-left: 5px solid #667eea;
                    padding-left: 15px;
                }
                .result-box {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    margin: 20px 0;
                }
                .result-box .emoji {
                    font-size: 60px;
                    margin-bottom: 10px;
                }
                .result-box .emotion {
                    font-size: 32px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .result-box .confidence {
                    font-size: 24px;
                    opacity: 0.9;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background: #f8f9fa;
                    font-weight: bold;
                    color: #4f46e5;
                }
                .bar-container {
                    background: #f0f0f0;
                    height: 25px;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .bar {
                    height: 100%;
                    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                    transition: width 0.3s;
                }
                .footer {
                    margin-top: 50px;
                    padding-top: 20px;
                    border-top: 2px solid #ddd;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                }
                img {
                    max-width: 100%;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎭 Emotion Analysis Report</h1>
                <p>Generated on: ${timestamp}</p>
            </div>

            <div class="section">
                <h2>📸 Analyzed Image</h2>
                <img src="${lastAnalysisResult.image}" alt="Analyzed Image">
            </div>

            <div class="section">
                <h2>🎯 Primary Result</h2>
                <div class="result-box">
                    <div class="emoji">${emotionEmojis[lastAnalysisResult.primary_emotion] || '😐'}</div>
                    <div class="emotion">${lastAnalysisResult.primary_emotion}</div>
                    <div class="confidence">${lastAnalysisResult.confidence}% Confidence</div>
                </div>
            </div>

            <div class="section">
                <h2>📊 Detailed Emotion Breakdown</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Emotion</th>
                            <th>Confidence</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lastAnalysisResult.all_emotions.map(e => `
                            <tr>
                                <td>${emotionEmojis[e.emotion] || '😐'} ${e.emotion}</td>
                                <td>${e.confidence}%</td>
                                <td>
                                    <div class="bar-container">
                                        <div class="bar" style="width: ${e.confidence}%"></div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            ${lastAnalysisResult.face_details ? `
            <div class="section">
                <h2>👤 Face Details</h2>
                <table>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                    ${lastAnalysisResult.face_details.age_range ? `
                    <tr>
                        <td>Age Range</td>
                        <td>${lastAnalysisResult.face_details.age_range.Low} - ${lastAnalysisResult.face_details.age_range.High} years</td>
                    </tr>
                    ` : ''}
                    ${lastAnalysisResult.face_details.gender ? `
                    <tr>
                        <td>Gender</td>
                        <td>${lastAnalysisResult.face_details.gender.Value} (${lastAnalysisResult.face_details.gender.Confidence.toFixed(1)}%)</td>
                    </tr>
                    ` : ''}
                    ${lastAnalysisResult.face_details.smile ? `
                    <tr>
                        <td>Smile</td>
                        <td>${lastAnalysisResult.face_details.smile.Value ? 'Yes' : 'No'} (${lastAnalysisResult.face_details.smile.Confidence.toFixed(1)}%)</td>
                    </tr>
                    ` : ''}
                    ${lastAnalysisResult.face_details.eyeglasses ? `
                    <tr>
                        <td>Eyeglasses</td>
                        <td>${lastAnalysisResult.face_details.eyeglasses.Value ? 'Yes' : 'No'} (${lastAnalysisResult.face_details.eyeglasses.Confidence.toFixed(1)}%)</td>
                    </tr>
                    ` : ''}
                </table>
            </div>
            ` : ''}

            <div class="footer">
                <p>This report was generated by Emotion Recognition AI powered by AWS Rekognition</p>
                <p>© ${new Date().getFullYear()} - All Rights Reserved</p>
            </div>
        </body>
        </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for images to load before printing
    printWindow.onload = function() {
        setTimeout(() => {
            printWindow.print();
            showNotification('PDF report opened in new window. Use Print dialog to save as PDF.', 'success');
        }, 500);
    };
}

function generateJSONReport() {
    const reportData = {
        report_type: 'Emotion Analysis Report',
        generated_at: new Date().toISOString(),
        analysis: lastAnalysisResult
    };

    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('JSON report downloaded successfully!', 'success');
}

function generateCSVReport() {
    const timestamp = new Date(lastAnalysisResult.timestamp).toLocaleString();
    
    let csv = 'Emotion Analysis Report\n\n';
    csv += 'Generated At,' + timestamp + '\n\n';
    
    csv += 'Primary Emotion,' + lastAnalysisResult.primary_emotion + '\n';
    csv += 'Confidence,' + lastAnalysisResult.confidence + '%\n';
    csv += 'Faces Detected,' + lastAnalysisResult.faces_count + '\n\n';
    
    csv += 'Emotion Breakdown\n';
    csv += 'Emotion,Confidence %\n';
    lastAnalysisResult.all_emotions.forEach(e => {
        csv += e.emotion + ',' + e.confidence + '\n';
    });
    
    if (lastAnalysisResult.face_details) {
        csv += '\nFace Details\n';
        csv += 'Attribute,Value\n';
        
        if (lastAnalysisResult.face_details.age_range) {
            csv += 'Age Range,' + lastAnalysisResult.face_details.age_range.Low + '-' + lastAnalysisResult.face_details.age_range.High + ' years\n';
        }
        if (lastAnalysisResult.face_details.gender) {
            csv += 'Gender,' + lastAnalysisResult.face_details.gender.Value + ' (' + lastAnalysisResult.face_details.gender.Confidence.toFixed(1) + '%)\n';
        }
        if (lastAnalysisResult.face_details.smile) {
            csv += 'Smile,' + (lastAnalysisResult.face_details.smile.Value ? 'Yes' : 'No') + ' (' + lastAnalysisResult.face_details.smile.Confidence.toFixed(1) + '%)\n';
        }
        if (lastAnalysisResult.face_details.eyeglasses) {
            csv += 'Eyeglasses,' + (lastAnalysisResult.face_details.eyeglasses.Value ? 'Yes' : 'No') + ' (' + lastAnalysisResult.face_details.eyeglasses.Confidence.toFixed(1) + '%)\n';
        }
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-analysis-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('CSV report downloaded successfully!', 'success');
}

// ========================================
// n8n WORKFLOW INTEGRATION
// ========================================

async function sendToN8N(emotionData, userText = null) {
    const n8nStatusEl = document.getElementById('n8n-status');
    
    try {
        n8nStatusEl.style.display = 'block';
        n8nStatusEl.className = 'info';
        n8nStatusEl.textContent = '🔄 Sending to n8n workflow...';
        
        const response = await fetch(`${API_URL}/n8n/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emotion_data: emotionData,
                user_text: userText
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            n8nStatusEl.className = 'success';
            n8nStatusEl.textContent = '✅ Successfully sent to n8n workflow!';
            setTimeout(() => {
                n8nStatusEl.style.display = 'none';
            }, 5000);
        } else {
            n8nStatusEl.className = 'error';
            n8nStatusEl.textContent = '❌ Failed to send to n8n: ' + result.error;
        }
    } catch (error) {
        n8nStatusEl.className = 'error';
        n8nStatusEl.textContent = '❌ Error connecting to n8n: ' + error.message;
    }
}

async function testN8NConnection() {
    const n8nStatusEl = document.getElementById('n8n-status');
    const testBtn = document.getElementById('test-n8n-btn');
    
    testBtn.disabled = true;
    testBtn.innerHTML = '<span class="btn-icon">⏳</span> Testing...';
    
    try {
        n8nStatusEl.style.display = 'block';
        n8nStatusEl.className = 'info';
        n8nStatusEl.textContent = '🔄 Testing n8n connection...';
        
        const response = await fetch(`${API_URL}/n8n/test`);
        const result = await response.json();
        
        if (result.success) {
            n8nStatusEl.className = 'success';
            n8nStatusEl.textContent = '✅ n8n webhook is working! Status: ' + result.status_code;
        } else {
            n8nStatusEl.className = 'error';
            n8nStatusEl.textContent = '❌ n8n connection failed: ' + result.error;
        }
    } catch (error) {
        n8nStatusEl.className = 'error';
        n8nStatusEl.textContent = '❌ Cannot reach n8n: ' + error.message;
    } finally {
        testBtn.disabled = false;
        testBtn.innerHTML = '<span class="btn-icon">🧪</span> Test n8n Connection';
        
        setTimeout(() => {
            n8nStatusEl.style.display = 'none';
        }, 7000);
    }
}

// Event Listeners for n8n Integration
document.getElementById('send-to-n8n-btn').addEventListener('click', () => {
    if (lastAnalysisResult) {
        sendToN8N(lastAnalysisResult);
    }
});

document.getElementById('test-n8n-btn').addEventListener('click', testN8NConnection);

// Auto-send toggle
document.getElementById('n8n-auto-send').addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    if (isEnabled) {
        showNotification('n8n auto-send enabled! Results will be sent automatically.', 'success');
    } else {
        showNotification('n8n auto-send disabled.', 'info');
    }
});

