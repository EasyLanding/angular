/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        auth: "url('/assets/auth.jpg')",
      }),
    },
  },
  plugins: [],
};
