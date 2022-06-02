module.exports = {
  rules: {
    'no-undef': 'off',
  },
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:testing-library/react', 'plugin:jest/all'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 13,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
}
