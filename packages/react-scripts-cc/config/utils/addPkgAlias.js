var path = require('path')
var readFileSync = require('fs').readFileSync

module.exports = function addPkgAlias(paths, opts) {
  var appPath = paths.appPath
  if (!appPath) {
    throw new Error('react scripts: no app path')
  }

  var pkgPath = path.join(appPath, 'package.json')
  var alias
  try {
    var str = readFileSync(pkgPath, 'utf8')
    var json = JSON.parse(str)
    alias = json.alias
  } catch (e) {}

  if (!alias) {
    return opts
  }

  for (var p in alias) {
    alias[p] = path.join(appPath, alias[p])
  }

  Object.assign(opts.alias, alias)
  return opts
}
