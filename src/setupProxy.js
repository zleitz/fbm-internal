const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/highrise',
    createProxyMiddleware({
      target:
        'https://footbridgemedia.highrisehq.com/parties.xml?kind=parties&n=0&tag=',
      changeOrigin: true,
    })
  );
  app.use(
    '/serp',
    createProxyMiddleware({
      target: 'https://serpapi.com/search.json?engine=google&q=',
      changeOrigin: true,
    })
  );
};
