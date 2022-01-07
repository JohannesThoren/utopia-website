// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.



<template>
	<div id="header" class="shadow">
		<div class="left">
			<router-link to="/" class="title">Utopia</router-link>
		</div>

		<div class="center">
			<search-bar id="search" />
		</div>

		<div class="right">
			<div class="right user-control" v-if="$store.state.authorized">
				<button
					v-if="$store.state.authorized"
					@click="$emit('show-new-board')"
					class="btn user-control"
				>
					New Board
				</button>
				<avatar-menu class="user-control"/>
			</div>
			<div v-else class="btn-group">
				<button class="btn" @click="$emit('show-signin')">Sign In</button>
				<button class="btn btn-hollow" @click="$emit('show-signup')">
					Sign Up
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import AvatarMenu from "../components/AvatarMenu.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
	name: "SiteHeader",
	components: {
		AvatarMenu,
		SearchBar,
	},
};
</script>

<style scoped>
#search {
	box-sizing: border-box;
}

#header {
	padding: var(--padding-medium);
	position: fixed;
	background-color: white;
	display: grid;
	grid-template-columns: 25vw 50vw 25vw;
	width: 100vw;
	z-index: 60;
	align-items: center;
}

.right {
	display: flex;
	align-items: center;
	margin-inline: auto;
}

.right .user-control {
	display: flex;
	gap: 0.625rem;
}
</style>
