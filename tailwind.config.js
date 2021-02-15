module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        support: "#3BE47A",
        orange: "#fd8c04"
      },
      spacing: {
        28: "7rem"
      },
      letterSpacing: {
        tighter: "-.04em"
      },
      lineHeight: {
        tight: 1.2
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem"
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)"
      },
      keyframes: {
        fromBottom: {
          "0%": { transform: "translateY(1000px)" },
          "100%": { transform: "translateY(0px)" }
        }
      },
      animation: {
        fromBottom: "fromBottom 0.7s ease-in-out"
      }
    }
  }
};
