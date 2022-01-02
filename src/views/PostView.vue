// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
	<div id="wrapper">
		<div class="card">
			<h2 class="card-header center-text">Info</h2>
			<div class="card-content">
				<p>Author: {{ post["author"] }}</p>
				<p>Board: {{ post["board"] }}</p>
				<p>Created: {{ post["created"] }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { api_get_call } from "../api_calls";
export default {
	name: "PostView",
	components: {},
	data() {
		return {
			post: "",
		};
	},
	async created() {
		this.post = await api_get_call(
			this.$store.state.api_root,
			"post/" + this.$route.params.id
		);
		console.log(this.post);
	},
};
</script>

<style scoped>
#wrapper {
	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
	gap: 10px;
}
</style>
