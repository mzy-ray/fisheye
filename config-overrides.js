const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {override, addWebpackPlugin} = require('customize-cra');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const {GitRevisionPlugin} = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({lightweightTags: true, branch: true});

// class MyPlugin {
//   apply(compiler) {
//     compiler.hooks.compilation.tap('MyPlugin', compilation => {
//       console.log('The compiler is starting a new compilation...');

//       // Static Plugin interface |compilation |HOOK NAME | register listener
//       HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
//         'MyPlugin', // <-- Set a meaningful name here for stacktraces
//         (assets, outputname) => {
//           // Manipulate the content
//           console.log(assets);
//           // data.html += 'The Magic Footer';
//           // Tell webpack to move on
//           // cb(null, data);
//         }
//       );
//     });
//   }
// }

const version = JSON.stringify(`${gitRevisionPlugin.branch()}: ${gitRevisionPlugin.version()}`);

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': version,
    })
  ),
  addWebpackPlugin(
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      APP_VERSION: version,
    })
  )
);
