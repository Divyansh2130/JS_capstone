// PWA Service Worker Registration and Install Prompt
export async function initPWA() {
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      console.log('Service Worker registered successfully:', registration);

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Show update notification
            console.log('New service worker available. Update available.');
            showUpdatePrompt();
          }
        });
      });
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }

  // Handle install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event for later use
    deferredPrompt = e;
    // Show install button/prompt
    showInstallPrompt(deferredPrompt);
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // Hide install prompt
    hideInstallPrompt();
  });
}

// Show install prompt
function showInstallPrompt(deferredPrompt) {
  // Get the install button from the navbar
  const installButton = document.getElementById('install-btn');
  
  if (installButton) {
    // Show the install button
    installButton.classList.remove('hidden');
    installButton.classList.add('flex');
    
    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, clear it
        deferredPrompt = null;
      }
    });
  } else {
    console.log('Install prompt is ready. User can install the app.');
  }
}

// Hide install prompt
function hideInstallPrompt() {
  const installButton = document.getElementById('install-btn');
  if (installButton) {
    installButton.classList.add('hidden');
    installButton.classList.remove('flex');
  }
}

// Show update available notification
function showUpdatePrompt() {
  console.log('Update available - you can reload the page to get the latest version');
  // You can add a toast/notification here to inform user
  // Example: showNotification('Update available', 'Click to reload');
}

// Check if app is running as PWA
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         navigator.standalone === true ||
         document.referrer.includes('android-app://');
}

// Get PWA display mode
export function getPWADisplayMode() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  if (navigator.standalone === true) {
    return 'standalone';
  }
  return 'browser';
}
