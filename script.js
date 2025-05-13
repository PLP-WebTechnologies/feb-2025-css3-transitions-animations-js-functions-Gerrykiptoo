// DOM Elements
const container = document.querySelector('.container');
const themeButtons = document.querySelectorAll('.theme-btn');
const animationButtons = document.querySelectorAll('.animation-btn');
const animatedElement = document.getElementById('animated-box');
const clearPreferencesBtn = document.getElementById('clear-preferences');

// User Preferences Object
const userPreferences = {
    theme: 'light',
    lastAnimation: 'none'
};

// Function to save preferences to localStorage
function savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    console.log('Preferences saved:', userPreferences);
}

// Function to load preferences from localStorage
function loadPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        userPreferences.theme = parsedPreferences.theme;
        userPreferences.lastAnimation = parsedPreferences.lastAnimation;
        
        console.log('Preferences loaded:', userPreferences);
        
        // Apply saved theme
        applyTheme(userPreferences.theme);
        
        // Apply saved animation if it's not 'none'
        if (userPreferences.lastAnimation !== 'none') {
            applyAnimation(userPreferences.lastAnimation);
        }
    } else {
        // Default theme if no preferences are saved
        applyTheme('light');
    }
}

// Function to apply theme
function applyTheme(theme) {
    // Remove all theme classes
    container.classList.remove('light-theme', 'dark-theme', 'colorful-theme');
    
    // Add the selected theme class
    container.classList.add(`${theme}-theme`);
    
    // Update user preferences
    userPreferences.theme = theme;
    
    // Save to localStorage
    savePreferences();
    
    // Visual feedback - highlight the selected theme button
    themeButtons.forEach(btn => {
        if (btn.id === `theme-${theme}`) {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        } else {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        }
    });
}

// Function to apply animation
function applyAnimation(animationType) {
    // Remove all animation classes
    animatedElement.classList.remove('rotate', 'bounce', 'pulse');
    
    if (animationType !== 'reset') {
        // Add the selected animation class
        animatedElement.classList.add(animationType);
        
        // Update user preferences
        userPreferences.lastAnimation = animationType;
    } else {
        // If reset, set lastAnimation to 'none'
        userPreferences.lastAnimation = 'none';
    }
    
    // Save to localStorage
    savePreferences();
    
    // Visual feedback - highlight the selected animation button
    animationButtons.forEach(btn => {
        if (btn.id === `animation-${animationType}`) {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        } else {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        }
    });
}

// Function to clear preferences
function clearPreferences() {
    localStorage.removeItem('userPreferences');
    
    // Reset to defaults
    userPreferences.theme = 'light';
    userPreferences.lastAnimation = 'none';
    
    // Apply default theme
    applyTheme('light');
    
    // Remove all animations
    animatedElement.classList.remove('rotate', 'bounce', 'pulse');
    
    // Reset button styles
    animationButtons.forEach(btn => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = 'none';
    });
    
    console.log('Preferences cleared');
    
    // Add a visual feedback for the user
    clearPreferencesBtn.textContent = 'Preferences Cleared!';
    setTimeout(() => {
        clearPreferencesBtn.textContent = 'Clear Saved Preferences';
    }, 2000);
}

// Event Listeners for Theme Buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.id.replace('theme-', '');
        applyTheme(theme);
    });
});

// Event Listeners for Animation Buttons
animationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const animation = button.id.replace('animation-', '');
        applyAnimation(animation);
    });
});

// Event Listener for Clear Preferences Button
clearPreferencesBtn.addEventListener('click', clearPreferences);

// Load preferences when the page loads
document.addEventListener('DOMContentLoaded', loadPreferences);

// Mouse Hover Effects
animatedElement.addEventListener('mouseenter', () => {
    if (!animatedElement.classList.contains('rotate') && 
        !animatedElement.classList.contains('bounce') && 
        !animatedElement.classList.contains('pulse')) {
        animatedElement.style.transform = 'scale(1.1)';
    }
});

animatedElement.addEventListener('mouseleave', () => {
    if (!animatedElement.classList.contains('rotate') && 
        !animatedElement.classList.contains('bounce') && 
        !animatedElement.classList.contains('pulse')) {
        animatedElement.style.transform = 'scale(1)';
    }
});