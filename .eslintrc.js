module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		//忽略首行缩进
		"no-tabs": "off",
		//总是以;结尾
		"semi":["error","always"],
		//关闭首行缩进报错
		"indent": ["off", 2],
    //方法名与括号之间不需要空格
    "space-before-function-paren": 0
	}
}
