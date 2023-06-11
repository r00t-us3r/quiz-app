module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset", "@babel/preset-flow", "babel-preset-expo"],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
    plugins: [
      ["module:react-native-dotenv"],
      [
        "babel-plugin-inline-import",
        {
          extensions: [".svg"],
        },
      ],
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        },
      ],
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
        },
      ],
    ],
  };
};
