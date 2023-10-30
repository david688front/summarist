const withTM = require("next-transpile-modules")([
  "@invertase/firestore-stripe-payments",
]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
});

