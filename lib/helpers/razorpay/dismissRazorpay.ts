export function dismissRazorpay(razorpayInstance?: any) {
  try {
    if (razorpayInstance && typeof razorpayInstance.close === "function") {
      razorpayInstance.close();
    }
  } catch {}

  try {
    if (typeof document !== "undefined") {
      const selectors = [
        ".razorpay-container",
        ".razorpay-backdrop",
        "iframe[src*='razorpay']",
        "div[class*='razorpay']",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          try {
            el.remove();
          } catch {}
        });
      });
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  } catch {}
}
