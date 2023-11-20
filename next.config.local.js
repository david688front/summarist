/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    //reactStrictMode: true,
    env: {
      STRIPE_SECRET_KEY: 'sk_test_51OAQ5hL3S5nVxXEOwMAsWtWywSFcFDCPOYT7aBBzXAYpcPwDTSMEJxedax67fOphh5AToOLZ7EMZ0L9lATElNx9700t5iuOJAD',
      STRIPE_PUBLISHABLE_KEY: 'pk_test_51OAQ5hL3S5nVxXEO0ROqCjGBKFEE5mKKhbzPF0QA28EJ03TMTlp1BZ83VF89GCg1oDU3nI2UoyVt6SrkedOZeshu009O5mlIPi'
    },
   }
  
  module.exports = nextConfig
  