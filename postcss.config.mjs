const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "custom-properties": true,
        "nesting": true,
      },
    },
  },
};

export default config;
