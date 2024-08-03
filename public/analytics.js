(function (_0x591033, _0x1d9181) {
    const _0x559ff4 = _0x143c,
        _0x2247d1 = _0x591033();
    while (!![]) {
        try {
            const _0x2323a1 =
                (parseInt(_0x559ff4(0x19c)) / 0x1) *
                    (parseInt(_0x559ff4(0x1b0)) / 0x2) +
                (-parseInt(_0x559ff4(0x17c)) / 0x3) *
                    (parseInt(_0x559ff4(0x175)) / 0x4) +
                (-parseInt(_0x559ff4(0x18d)) / 0x5) *
                    (-parseInt(_0x559ff4(0x1a3)) / 0x6) +
                (-parseInt(_0x559ff4(0x182)) / 0x7) *
                    (parseInt(_0x559ff4(0x17a)) / 0x8) +
                (-parseInt(_0x559ff4(0x17e)) / 0x9) *
                    (-parseInt(_0x559ff4(0x193)) / 0xa) +
                (parseInt(_0x559ff4(0x190)) / 0xb) *
                    (-parseInt(_0x559ff4(0x187)) / 0xc) +
                (-parseInt(_0x559ff4(0x1a6)) / 0xd) *
                    (-parseInt(_0x559ff4(0x177)) / 0xe);
            if (_0x2323a1 === _0x1d9181) break;
            else _0x2247d1["push"](_0x2247d1["shift"]());
        } catch (_0x2fcf45) {
            _0x2247d1["push"](_0x2247d1["shift"]());
        }
    }
})(_0x44d4, 0xbd2f8),
    (function () {
        const _0x3a2032 = _0x143c,
            _0xcae70a = document[_0x3a2032(0x179)](_0x3a2032(0x174)),
            _0x210ebb = _0xcae70a
                ? _0xcae70a[_0x3a2032(0x184)](_0x3a2032(0x180))
                : "",
            _0x5263cd = {
                referrer: document[_0x3a2032(0x18a)],
                screenWidth: window[_0x3a2032(0x197)],
                pages: {},
                ip: null,
                userAgent: navigator[_0x3a2032(0x19f)],
            };
        let _0x46f321 = null,
            _0x3683f7 = ![];
        async function _0x41b00a() {
            const _0x2b889b = _0x3a2032;
            try {
                const _0x32b40d = await fetch(_0x2b889b(0x173));
                if (!_0x32b40d["ok"]) throw new Error(_0x2b889b(0x194));
                const _0x4bf35a = await _0x32b40d[_0x2b889b(0x1a5)]();
                (_0x5263cd["ip"] = _0x4bf35a["ip"]), (_0x3683f7 = !![]);
            } catch (_0xfe5848) {
                console[_0x2b889b(0x1ae)](_0x2b889b(0x178), _0xfe5848),
                    (_0x3683f7 = !![]);
            }
        }
        function _0x3df0fe() {
            const _0x24b8be = _0x3a2032;
            if (_0x46f321) {
                const _0xb528f6 = Math[_0x24b8be(0x19a)](
                        (Date[_0x24b8be(0x191)]() -
                            new Date(_0x46f321[_0x24b8be(0x17b)])[
                                _0x24b8be(0x185)
                            ]()) /
                            0x3e8,
                    ),
                    _0xad64c = {
                        ..._0x5263cd,
                        pages: {
                            ..._0x5263cd["pages"],
                            [_0x46f321["url"]]: [
                                Object[_0x24b8be(0x1a9)](_0x5263cd["pages"])[
                                    "length"
                                ] + 0x1,
                                _0xb528f6,
                            ],
                        },
                    };
                try {
                    console[_0x24b8be(0x19d)](
                        "Attempting\x20to\x20send\x20analytics",
                        _0xad64c,
                    ),
                        fetch(_0x210ebb + _0x24b8be(0x17d), {
                            method: "POST",
                            headers: { "Content-Type": _0x24b8be(0x1af) },
                            body: JSON[_0x24b8be(0x181)](_0xad64c),
                        })
                            [_0x24b8be(0x188)]((_0x5ac431) => {
                                const _0x3b668a = _0x24b8be;
                                if (!_0x5ac431["ok"])
                                    throw new Error(
                                        _0x3b668a(0x1aa) +
                                            _0x5ac431[_0x3b668a(0x1ad)],
                                    );
                                console[_0x3b668a(0x19d)](_0x3b668a(0x1a8));
                            })
                            [_0x24b8be(0x19b)]((_0x1d1bdd) => {
                                const _0x2ac75d = _0x24b8be;
                                console[_0x2ac75d(0x1ae)](
                                    "Failed\x20to\x20send\x20analytics:",
                                    _0x1d1bdd,
                                );
                            });
                } catch (_0x33dbf5) {
                    console[_0x24b8be(0x1ae)](_0x24b8be(0x18c), _0x33dbf5);
                }
            }
        }
        function _0x542a4d() {
            const _0x2330a1 = _0x3a2032;
            (document[_0x2330a1(0x19e)] === _0x2330a1(0x1ab) ||
                document[_0x2330a1(0x1ab)]) &&
                (console[_0x2330a1(0x19d)](_0x2330a1(0x176)), _0x3df0fe());
        }
        function _0xaaa893() {
            const _0x38eb21 = _0x3a2032,
                _0x42b30f =
                    window[_0x38eb21(0x183)][_0x38eb21(0x195)] +
                    window[_0x38eb21(0x183)][_0x38eb21(0x186)],
                _0x57356f = new Date()["toISOString"]();
            if (_0x46f321) {
                const _0x51c431 = Math["round"](
                    (Date["now"]() -
                        new Date(_0x46f321[_0x38eb21(0x17b)])[
                            _0x38eb21(0x185)
                        ]()) /
                        0x3e8,
                );
                _0x5263cd["pages"][_0x46f321[_0x38eb21(0x18b)]] = [
                    Object[_0x38eb21(0x1a9)](_0x5263cd[_0x38eb21(0x192)])[
                        _0x38eb21(0x1a1)
                    ] + 0x1,
                    _0x51c431,
                ];
            }
            _0x46f321 = {
                url: _0x42b30f,
                timestamp: _0x57356f,
                timeSpent: 0x0,
            };
        }
        function _0x4a5bd8(_0x3fa441, _0x3ad009 = {}) {
            const _0x4969ce = _0x3a2032;
            try {
                const _0x3d7ba0 = {
                    name: _0x3fa441,
                    timestamp: new Date()[_0x4969ce(0x198)](),
                    data: _0x3ad009,
                    ip: _0x5263cd["ip"],
                    userAgent: _0x5263cd[_0x4969ce(0x19f)],
                };
                fetch(_0x210ebb + "/api/event", {
                    method: _0x4969ce(0x1a2),
                    headers: { "Content-Type": _0x4969ce(0x1af) },
                    body: JSON["stringify"](_0x3d7ba0),
                })
                    [_0x4969ce(0x188)]((_0x28a921) => {
                        const _0x3a0b9c = _0x4969ce;
                        if (!_0x28a921["ok"])
                            throw new Error(
                                _0x3a0b9c(0x1aa) + _0x28a921["status"],
                            );
                        console["log"]("Event\x20logged\x20successfully");
                    })
                    [_0x4969ce(0x19b)]((_0x4de875) => {
                        const _0x3ba814 = _0x4969ce;
                        console["error"](_0x3ba814(0x18f), _0x4de875);
                    });
            } catch (_0x5d3e1a) {
                console[_0x4969ce(0x1ae)](_0x4969ce(0x18f), _0x5d3e1a);
            }
        }
        (window[_0x3a2032(0x1ac)] = _0x4a5bd8),
            document[_0x3a2032(0x17f)](_0x3a2032(0x1a7), _0x542a4d),
            window[_0x3a2032(0x17f)](_0x3a2032(0x18e), _0x3df0fe),
            _0x41b00a()[_0x3a2032(0x188)](() => {
                const _0x31250a = _0x3a2032;
                if (_0x3683f7) {
                    _0xaaa893(),
                        window[_0x31250a(0x17f)](_0x31250a(0x1a0), _0xaaa893),
                        window[_0x31250a(0x17f)](_0x31250a(0x189), _0xaaa893),
                        window[_0x31250a(0x17f)]("replacestate", _0xaaa893);
                    const _0x268baa = history[_0x31250a(0x199)];
                    history[_0x31250a(0x199)] = function () {
                        _0x268baa["apply"](history, arguments),
                            window["dispatchEvent"](new Event("pushstate"));
                    };
                    const _0x51c87d = history["replaceState"];
                    history["replaceState"] = function () {
                        const _0x4d5f36 = _0x31250a;
                        _0x51c87d["apply"](history, arguments),
                            window[_0x4d5f36(0x196)](
                                new Event(_0x4d5f36(0x1a4)),
                            );
                    };
                }
            });
    })();
function _0x143c(_0x7935d8, _0x5af710) {
    const _0x44d454 = _0x44d4();
    return (
        (_0x143c = function (_0x143c7c, _0x4390c5) {
            _0x143c7c = _0x143c7c - 0x173;
            let _0x181c18 = _0x44d454[_0x143c7c];
            return _0x181c18;
        }),
        _0x143c(_0x7935d8, _0x5af710)
    );
}
function _0x44d4() {
    const _0x39c4b6 = [
        "/api/session",
        "1179fUBDGL",
        "addEventListener",
        "data-analytics-url",
        "stringify",
        "7qPUGNx",
        "location",
        "getAttribute",
        "getTime",
        "search",
        "12OYDfHq",
        "then",
        "pushstate",
        "referrer",
        "url",
        "Failed\x20to\x20send\x20analytics:",
        "1015yWbvlA",
        "beforeunload",
        "Failed\x20to\x20log\x20event:",
        "3521419nvHPFC",
        "now",
        "pages",
        "5150SsmXPv",
        "Failed\x20to\x20fetch\x20client\x20IP",
        "pathname",
        "dispatchEvent",
        "innerWidth",
        "toISOString",
        "pushState",
        "round",
        "catch",
        "33546ZmYOMt",
        "log",
        "visibilityState",
        "userAgent",
        "popstate",
        "length",
        "POST",
        "14610IDfCoi",
        "replacestate",
        "json",
        "4635189FmSbqC",
        "visibilitychange",
        "Analytics\x20sent\x20successfully",
        "keys",
        "HTTP\x20error!\x20status:\x20",
        "hidden",
        "logEvent",
        "status",
        "error",
        "application/json",
        "52mBepxR",
        "https://api.ipify.org?format=json",
        "script[data-analytics-url]",
        "1480200TWMxPR",
        "Hidden",
        "14sEwNgi",
        "Error\x20fetching\x20client\x20IP:",
        "querySelector",
        "2603488trSrdC",
        "timestamp",
        "3tRHHeL",
    ];
    _0x44d4 = function () {
        return _0x39c4b6;
    };
    return _0x44d4();
}
