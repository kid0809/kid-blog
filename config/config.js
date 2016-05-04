'use strict';

import path from 'path';

export default {
  name: 'Kid blog',

  webport: 8080,
  apiport: 8081,

  rootPath: path.resolve(__dirname, '../'),

  secret: 'push loli',
  db: 'blog'
};
