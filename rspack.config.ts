import { defineConfig } from "@rspack/cli";
import { type RspackPluginFunction, rspack, ExternalItemFunctionData } from "@rspack/core";
import { VueLoaderPlugin } from "vue-loader";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
	entry: {
		vue: 'vue',
		HelloWorld: "./src/components/HelloWorld.vue",
		main: "./src/main.ts",
	},
	output: {
        chunkFormat: isProduction ? 'module' : 'array-push',
        module: true,
        library: {
            type: isProduction ? 'modern-module' : 'module'
        },
	},
	externalsType: 'module-import',
	externals: (data: ExternalItemFunctionData) => {
		if (data.request === 'vue' && data.contextInfo?.issuer) {
			return '/vue.mjs';
		}
		if (data.request === 'HelloWorld.vue') {
			return '/HelloWorld.mjs';
		}
	},
	resolve: {
		extensions: ["...", ".ts", ".vue"]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					experimentalInlineMatchResource: true
				}
			},
			{
				test: /\.(js|ts)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							},
							env: { targets }
						}
					}
				]
			},
			{
				test: /\.svg/,
				type: "asset/resource"
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			scriptLoading: "module",
			template: "./index.html"
		}),
		new rspack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new VueLoaderPlugin() as RspackPluginFunction
	],
	optimization: {
		runtimeChunk: "single",
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		outputModule: true,
		css: true
	}
});
