module.exports = {
  extends: ['wolox-node'],
  rules: {
    'id-length': ['error', { max: 35 , min: 1 }],
    'class-methods-use-this': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'max-params': ['error', { max: 5 }]
  }
};
  