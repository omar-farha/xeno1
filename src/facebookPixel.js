export const FB_PIXEL_ID = "675110648646812"; // رقم الـ Pixel بتاعك

export const initFacebookPixel = () => {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", eventName, params);
  }
};
