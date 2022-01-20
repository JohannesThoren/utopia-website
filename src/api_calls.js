// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


/**
 * This function is used to get data from the API server
 * @param {String} str_api_root 
 * @param {String} str_call_path 
 * @returns Json Object containing the data you made a request for or an error code
 */

import axios from "axios";

export async function api_get_call(str_api_root, str_call_path) {
    const response = await axios.get(str_api_root + str_call_path);
    return response.data;
}

/**
 * 
 * @param {JSON} json_body 
 * @param {String} str_api_root 
 * @param {String} str_call_path 
 * @returns A Message or some json data depending on what you call.
 */
export async function api_post_call(json_body, str_api_root, str_call_path) {
    const response = await axios.post(str_api_root + str_call_path, JSON.stringify(json_body));
    return response.data
}

export async function token_authorize(str_token, str_api_root) {
    const response = await axios.get(str_api_root+"user/get/token/"+str_token)
    return response.data
} 