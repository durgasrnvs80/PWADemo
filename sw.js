self.addEventListener("fetch", (e) => {
    console.log("[Service Worker]:", e.request.url);
});