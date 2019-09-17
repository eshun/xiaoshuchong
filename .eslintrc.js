module.exports = {
  root: true,
  globals: { wx: true },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
      'comma-dangle': 0, // 对象字面量项尾不能有逗号
      'new-cap': 0, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
      'no-console': 0,// 禁止使用console
      'no-extra-semi': 0, // 禁止多余的冒号
      'no-new': 0, // 禁止在使用new构造一个实例后不赋值
      'no-undef': 0, // 不能有未定义的变量
      'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
      'semi': [2, 'always'], // 语句强制分号结尾
      'no-unused-expressions': 'off', // 禁止无用的表达式
      'generator-star-spacing': 'off', // 生成器函数*的前后空格
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 禁止使用debugger
  }
}
