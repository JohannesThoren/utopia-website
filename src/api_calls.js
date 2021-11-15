// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


/**
 * This function is used to get data from the API server
 * @param {String} api_root 
 * @param {String} call_path 
 * @returns Json Object containing the data you made a request for or an error code
 */

export async function api_get_call(api_root, call_path) {
    const response = await fetch(api_root + call_path);
    const data = await response.json();
    return data
}

/**
 * 
 * @param {JSON} body 
 * @param {String} api_root 
 * @param {String} call_path 
 * @returns A Message or some json data depending on waht the api call is 
 */
export async function api_post_call(body, api_root, call_path) {
    const response = await fetch(api_root + call_path, { 
        method: "POST", 
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data
}

export async function token_authorize(token, api_root) {
    const response = await fetch(api_root+"user/get/token/"+token)
    const data = await response.json()
    return data
} 