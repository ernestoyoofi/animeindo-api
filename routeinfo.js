function CreateRouteInfo(objMapRoute, hostPath = "/", globalHost = "localhost:3200") {
  const mapping = Array.from(objMapRoute.stack)
  const routes = mapping.map((a, i) => ({
    path: new URL(`${hostPath}${a.route.path}`, `https://${globalHost}${hostPath}`).href,
    method: (a.route.stack[0].method||"get")
  }))
  return routes
}

module.exports = CreateRouteInfo