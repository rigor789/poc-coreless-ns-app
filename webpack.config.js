const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack(config => {
    config.entry('bundle').clear().add('./app/app.ts')
    config.entryPoints.delete('tns_modules/inspector_modules');
  })

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};


