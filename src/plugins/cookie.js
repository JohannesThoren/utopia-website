// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const cookie = require('tiny-cookie')

const vueCookie = {
  // Main functions
  get: (name) => cookie.get(name),
  set: (name, value, options) => cookie.set(name, value, options),
  remove: (name, options) => cookie.remove(name, options),

  // More functions
  delete: (name, options) => cookie.remove(name, options), // alias of remove
  getAll: () => cookie.getAll()
}

export default (app) => {
  app.config.globalProperties.$cookie = vueCookie
}
