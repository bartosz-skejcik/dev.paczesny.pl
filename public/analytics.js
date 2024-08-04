function getBrowserType() {
    var isOpera =
        (!!window.opr && !!opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0;

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Chrome 1 - 79
    var isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);

    // Opera 8.0+
    if (
        (!!window.opr && !!opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0
    ) {
        return "Opera";
    }

    // Safari 3.0+
    if (
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(
            !window["safari"] ||
                (typeof safari !== "undefined" && safari.pushNotification),
        )
    ) {
        return "Safari";
    }

    // Internet Explorer 6-11
    if (/*@cc_on!@*/ false || !!document.documentMode) {
        return "Internet Explorer";
    }

    // Edge 20+
    if (isIE !== undefined && !isIE && !!window.StyleMedia) {
        return "Edge";
    }

    // Chrome 1 - 71
    if (
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime)
    ) {
        return "Chrome";
    }

    // Blink engine detection
    if ((isChrome || isOpera) && !!window.CSS) {
        return "Blink";
    }

    return "Unknown";
}

function getOS(userAgent) {
    const osMappings = [
        { regex: /(Win16)/, os: "Windows 3.11" },
        { regex: /(Windows 95)|(Win95)|(Windows_95)/, os: "Windows 95" },
        { regex: /(Windows 98)|(Win98)/, os: "Windows 98" },
        { regex: /(Windows NT 5.0)|(Windows 2000)/, os: "Windows 2000" },
        { regex: /(Windows NT 5.1)|(Windows XP)/, os: "Windows XP" },
        { regex: /(Windows NT 5.2)/, os: "Windows Server 2003" },
        { regex: /(Windows NT 6.0)/, os: "Windows Vista" },
        { regex: /(Windows NT 6.1)/, os: "Windows 7" },
        { regex: /(Windows NT 6.2)/, os: "Windows 8" },
        { regex: /(Windows NT 10.0)/, os: "Windows 10" },
        {
            regex: /(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)/,
            os: "Windows NT 4.0",
        },
        { regex: /(Windows ME)/, os: "Windows ME" },
        { regex: /(OpenBSD)/, os: "Open BSD" },
        { regex: /(SunOS)/, os: "Sun OS" },
        { regex: /(Linux)|(X11)/, os: "Linux" },
        { regex: /(Mac_PowerPC)|(Macintosh)/, os: "Mac OS" },
        { regex: /(QNX)/, os: "QNX" },
        { regex: /(BeOS)/, os: "BeOS" },
        { regex: /(OS\/2)/, os: "OS/2" },
        {
            regex: /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/,
            os: "Search Bot",
        },
    ];

    for (let i = 0; i < osMappings.length; i++) {
        if (osMappings[i].regex.test(userAgent)) {
            return osMappings[i].os;
        }
    }

    return "Unknown OS";
}

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
                referrer: document.referrer ?? "Direct",
                screen_width: window.innerWidth,
                user_agent: navigator.userAgent,
                os: getOS(navigator.platform),
                browser: getBrowserType(),
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
                user_agent: session.user_agent ?? navigator.userAgent,
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
