export const openAppOrStore = (path: string = "home") => {
  // Try to open the app using custom URL scheme
  const customUrl = `gk-fitness://${path}`;
  
  // Set timeout to redirect to store if app is not installed
  const timeoutId = setTimeout(() => {
    // Check OS to redirect to appropriate store
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href = "https://apps.apple.com/us/app/gk-gym-life/id6798680485";
    } 
    // Android detection
    else if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.gkeliteinfo.gkgymlife";
    } 
    // Fallback for web (you could redirect to a landing page or just do nothing)
    else {
      window.location.href = "https://play.google.com/store/apps/details?id=com.gkeliteinfo.gkgymlife";
    }
  }, 2500); // 2.5 seconds timeout

  // Navigate to custom URL
  window.location.href = customUrl;

  // Clear timeout if the page is hidden (which usually means the app opened successfully)
  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearTimeout(timeoutId);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange, { once: true });
};
