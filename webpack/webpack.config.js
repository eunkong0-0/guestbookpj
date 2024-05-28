module.exports = {
  entry : "./script.js",
  output : {
    path : __dirname,
    filename : "build.js",
  }, 
  module : {
    rules : [
      {
        test : /\.js$/,
        use : {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      }
    ]
  }
};