import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:8080/',
  changeOrigin: true
})

export default defineEventHandler((event) => {
  return new Promise((resolve) => {
    const options = {}

    const origEnd = event.node.res.end
    event.node.res.end = function () {
      resolve(null)
      return origEnd.call(event.node.res)
    }

    proxy.web(event.req, event.res, options) // proxy.web() works asynchronously
  })
})
