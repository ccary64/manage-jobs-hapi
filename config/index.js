const all = {
  routes: {
    files: {
      relativeTo: './front_end/public'
    }
  }
};

const development = {
  host: '0.0.0.0',
  port: 3000
};

exports.development = Object.assign(all, development);