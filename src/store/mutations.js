// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export default {
      authorized(state) {
            state.authorized = true
      },

      set_user(state, payload) {
            state.user = {
                  id: payload[0],
                  name: payload[1],
                  image: payload[2]
            }
      }
}