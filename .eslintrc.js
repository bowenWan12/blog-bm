module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'prettier/prettier': [
  //     'error',
  //     {
  //       semi: false,
  //       singleQuote: true,
  //       printWidth: 160
  //     }
  //   ]
  // },
  rules: {
    "generator-star-spacing": "off",
    "no-tabs": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-irregular-whitespace": "off",
    "no-debugger": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
