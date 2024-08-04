(function () {
    const scriptTag = document.querySelector("script[data-analytics-url]");
    const analyticsUrl = scriptTag
        ? scriptTag.getAttribute("data-analytics-url")
        : "";

    const session = {
        referrer: document.referrer,
        screen_width: window.innerWidth,
        pages: {},
        ip: null,
        user_agent: navigator.userAgent,
    };
    let currentPageView = null;
    let isInitialized = false;

    async function fetchClientIp() {
        try {
            const res = await fetch("https://api.ipify.org?format=json");
            if (!res.ok) {
                throw new Error("Failed to fetch client IP");
            }
            const data = await res.json();
            session.ip = data.ip;
            isInitialized = true;
        } catch (error) {
            console.error("Error fetching client IP:", error);
            isInitialized = true; // Still set to initialized even if IP fetch fails
        }
    }

    function sendAnalytics() {
        if (currentPageView) {
            const timeSpent = Math.round(
                (Date.now() - new Date(currentPageView.timestamp).getTime()) /
                    1000,
            );
            const updatedSession = {
                ...session,
                referrer: document.referrer ?? null,
                screen_width: window.innerWidth,
                user_agent: navigator.userAgent,
                os: navigator.platform,
                browser: navigator.userAgent,
                pages: {
                    ...session.pages,
                    [currentPageView.url]: [
                        Object.keys(session.pages).length + 1,
                        timeSpent,
                    ],
                },
            };

            try {
                fetch(`${analyticsUrl}/api/session`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedSession),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`,
                            );
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to send analytics:", error);
                    });
            } catch (error) {
                console.error("Failed to send analytics:", error);
            }
        }
    }

    function handleVisibilityChange() {
        if (document.visibilityState === "hidden" || document.hidden) {
            sendAnalytics();
        }
    }

    function handlePageChange() {
        const url = window.location.pathname + window.location.search;
        const timestamp = new Date().toISOString();

        if (currentPageView) {
            const timeSpent = Math.round(
                (Date.now() - new Date(currentPageView.timestamp).getTime()) /
                    1000,
            );
            session.pages[currentPageView.url] = [
                Object.keys(session.pages).length + 1,
                timeSpent,
            ];
        }

        currentPageView = { url, timestamp, timeSpent: 0 };
    }

    function logEvent(name, data = {}) {
        try {
            const eventData = {
                name,
                timestamp: new Date().toISOString(),
                data,
                ip: session.ip,
                userAgent: session.userAgent,
            };

            fetch(`${analyticsUrl}/api/event`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    console.error("Failed to log event:", error);
                });
        } catch (error) {
            console.error("Failed to log event:", error);
        }
    }

    // Expose logEvent function globally
    window.logEvent = logEvent;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("beforeunload", sendAnalytics);

    fetchClientIp().then(() => {
        if (isInitialized) {
            handlePageChange();
            window.addEventListener("popstate", handlePageChange);
            window.addEventListener("pushstate", handlePageChange); // Custom event for pushState
            window.addEventListener("replacestate", handlePageChange); // Custom event for replaceState

            // Monkey patch history.pushState and history.replaceState to trigger the event
            const pushState = history.pushState;
            history.pushState = function () {
                pushState.apply(history, arguments);
                window.dispatchEvent(new Event("pushstate"));
            };
            const replaceState = history.replaceState;
            history.replaceState = function () {
                replaceState.apply(history, arguments);
                window.dispatchEvent(new Event("replacestate"));
            };
        }
    });
})();
