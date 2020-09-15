'use strict';

const roles = {
  SuperUser: {
    can: [
      'user:delete'
    ],
    inherits: [ 'Editor' ]
  },
  Editor: {
    can: [ 'post:delete', 'post:edit', 'comment:delete' ],
    inherits: [ 'Writer' ]
  },
  Writer: {
    can: [ 'article', 'post:add' ],
    inherits: [ 'User' ]
  },
  User: {
    can: [
      'account', 'comment',
      {name: 'post:save', when: async (params) => params.ownerId === params.userId}
    ]
  }
};

module.exports.all = {
  roles,
};

module.exports.roles = roles;