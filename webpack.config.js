module.exports = {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
};
