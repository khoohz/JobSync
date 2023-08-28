// color design tokens export
// ctrl k -> ctrl g

export const tokensLight = {
  grey: {
    0: "#FFFFFF", 
    10: "#f6f6f6", 
    50: "#F4F4F6", // lightlight grey
    100: "#f1f1f2",
    200: "#E8E8E8", 
    300: "#D2D6DC", // input field box
    400: "#858585",
    500: "#666666",
    600: "#475467", // light grey font
    700: "#2D2D33", // dark bg
    800: "#1B1C1E", // dark font
    900: "#141414",
    1000: "#1A1A1A", 
  },

  primary: {
    // indigo
    100: "#EDEAF8", // light
    200: "#bdb0ef",
    300: "#9d88e8",
    400: "#7c61e0", 
    500: "#6F52DC", // main
    600: "#fff12e",
    700: "#372282",
    800: "#5b39d8", // higher contrast indigo
    900: "#120b2b"
  },

  secondary: {
    // yellow green
    100: "#c0f877",
    200: "#edffd7",
    300: "#e5ffc3",
    400: "#dcffaf",
    500: "#d3ff9b",
    600: "#a9cc7c",
    700: "#7f995d",
    800: "#47CF7C", // manually adjusted (green)
    900: "#212121"
},
};

// function that reverses the color palette for light theme
function reverseTokens(tokensLight) {
  const reversedTokens = {};
  Object.entries(tokensLight).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

// light theme
export const tokensDark = reverseTokens(tokensLight);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: { 
              ...tokensDark.secondary,
              main: tokensDark.secondary[500],
              light: tokensDark.secondary[500],
              dark: tokensDark.secondary[100],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[0],
            },
            background: {
              default: tokensDark.grey[100],
              alt: tokensDark.grey[100],
            },
            font: { // done
              ...tokensDark.grey,
              main: tokensDark.grey[900],
              light: tokensDark.grey[600],
            }
          }
        : {
            // palette values for light mode
            primary: { // done
              ...tokensLight.primary,
              dark: tokensLight.primary[100],
              main: tokensLight.primary[500],
              light: tokensLight.primary[100],
            },
            neutral: { // done
              ...tokensLight.grey,
              main: tokensLight.grey[0], 
            },
            background: { // done
              default: tokensLight.grey[10],
              alt: tokensLight.grey[10],
            },
            font: { // done
              ...tokensLight.grey,
              main: tokensLight.grey[700],
              light: tokensLight.grey[600],
            }
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 48,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 18,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h7: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};