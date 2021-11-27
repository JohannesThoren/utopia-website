// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<div id="header">
		<div class="wrapper">
			<router-link to="/" class="title">Utopia</router-link> 
		</div>
		<div class="wrapper">
			<input type="text" id="search" class="input" />
		</div>
		<div class="wrapper">
			<button v-if="$store.state.authorized" @click="$emit('show-new-board')" class="btn">New Board</button>
			<AvatarMenu v-if="$store.state.authorized" id="avatar" />
      <div v-if="!$store.state.authorized" class="btn-group">
        <button class="btn"  @click="$emit('show-signin')">Sign In</button>
        <button class="btn btn-hollow" @click="$emit('show-signup')">Sign Up</button>
      </div>

		</div>
	</div>
</template>

<script>
import AvatarMenu from "../components/AvatarMenu.vue";

export default {
	name: "SiteHeader",
	components: {
		AvatarMenu,
	},
};
</script>

<style scoped>
#search {
	width: 100%;
}

.wrapper {
	display: flex;
	box-shadow: none;
	justify-content: center;
	gap: 10px;
}

#header {
  padding-top: var(--padding-medium);
  padding-bottom: var(--padding-medium);

	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 60;
	background-color: white;
	box-shadow: var(--shadow);
	width: 100%;
	align-items: center;
}
</style>
