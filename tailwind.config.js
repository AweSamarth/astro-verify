/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        gray: {
          "100": "#191919",
          "200": "#0d0d10",
          "300": "#0a090b",
          "400": "rgba(23, 23, 23, 0.8)",
          "500": "rgba(255, 255, 255, 0.8)",
          "600": "rgba(255, 255, 255, 0.12)",
          "700": "rgba(255, 255, 255, 0.1)",
        },
        whitesmoke: {
          "100": "#efefef",
          "200": "#eee",
          "300": "rgba(239, 239, 239, 0.2)",
        },
        silver: {
          "100": "#bfbfbf",
          "200": "rgba(196, 196, 196, 0)",
        },
        darkgray: "#afafaf",
        blue: {
          "100": "#7000ff",
          "200": "rgba(112, 0, 255, 0.4)",
          "300": "rgba(112, 0, 255, 0.15)",
        },
        blueviolet: "rgba(100, 0, 212, 0.5)",
        darkslategray: "#343434",
      },
      fontFamily: {
        inter: "Inter",
        momcake: "Momcake",
        arial: "Arial",
        nasalization: "Nasalization",
        montserrat: "Montserrat",
        "fanwood-text": "'Fanwood Text'",
        roboto: "Roboto",
      },
      borderRadius: {
        "6xl": "25px",
      },
    },
    fontSize: {
      lg: "18px",
      mini: "15px",
      "13xl": "32px",
      xl: "20px",
      base: "16px",
      "25xl": "44px",
      "4xl": "23px",
      "3xl": "22px",
      "45xl": "64px",
      "17xl": "36px",
      sm: "14px",
      smi: "13px",
      "5xl": "24px",
      "8xl": "27px",
      "21xl": "40px",
      mid: "17px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
