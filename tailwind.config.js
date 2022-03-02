module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.js',
    './components/**/*.js',
    './utils/**/*.js',
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // ...
};
