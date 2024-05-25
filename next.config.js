const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy({
    subdirectory: "plausible",
    customDomain: "http://analytics.paczesny.pl:8000",
})({
    images: {
        domains: ["cdn.sanity.io"],
    },
});
