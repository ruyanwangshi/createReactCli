const { resolve } = require('path');
const path = require('path');

/**
 * @description: 
 * @param1 {*}
 * @return {*}
 * @detail: 
 * @param {*} p
 * @param {*} rootPath
 */
function resolvePath (p = '', rootPath) {
    const rP = rootPath || __dirname;
    if(typeof p === 'string') {
        return path.resolve(rP, p);
    } else if(Array.isArray(p)) {
        return path.resolve(rP, ...p);
    } else {
        return ''
    }
}

function templateContent (htmlWebpackPlugin) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <title>123</title>
        </head>
        <body>
          <noscript>
            <strong>We're sorry but 123 doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
          </noscript>
          <div id="app"></div>
            <!-- built files will be auto injected -->
          </body>
        </html>`
  }
  
  module.exports = { templateContent, resolvePath }
