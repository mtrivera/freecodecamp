// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app\/)/, // Files that are not in `app` dir.
      'app.js': /^app\//
    }
  },
  stylesheets: {
    joinTo: 'app.css'
  }
};

exports.plugins = {
  babel: {
    // Do not use ES6 compiler in vendor code
    ignore: [/vendor/],
    presets: ['es2015']
  },
  sass: {
    mode: 'native',
    sourceMapEmbed: true
  }
};

exports.npm = {
  enabled: true,
  aliases: {
    'vue': 'vue/dist/vue.common.js'
  }
};
