export default {
  // 环境变量
  env: {
    NODE_ENV: '"production"'
  },
  productionSourceMap: true,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: true,
  productionGzipExtensions: ['js', 'css'],
  // 上线资源路径配置，一般是CDN路径 例如：http://localhost:8080/
  assetsPublicPath: process.env.PUBLIC_URL || '',
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --analyze`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_analyze
};
