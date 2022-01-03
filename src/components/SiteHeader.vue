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

		<div>
			<div class="right" v-if="$store.state.authorized">
				<button
					v-if="$store.state.authorized"
					@click="$emit('show-new-board')"
					class="btn"
				>
					New Board
				</button>
				<avatar-menu />
			</div>
			<div v-else class="btn-group">
				<button class="btn" @click="$emit('show-signin')">Sign In</button>
				<button class="btn btn-hollow" @click="$emit('show-signup')">
					Sign Up
				</button>
			</div>
		</div>
	</div>
	<!-- <div id="header">
		<div class="wrapper">
			<router-link to="/" class="title">Utopia</router-link>
		</div>
		<div class="wrapper">
			<SearchBar id="search" />
		</div>
		<button
			v-if="$store.state.authorized"
			@click="$emit('show-new-board')"
			class="btn"
		>
			New Board
		</button>
		<AvatarMenu v-if="$store.state.authorized" id="avatar" />
		<div v-else class="btn-group">
			<button class="btn" @click="$emit('show-signin')">Sign In</button>
			<button class="btn btn-hollow" @click="$emit('show-signup')">
				Sign Up
			</button>
		</div>
	</div> -->
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
	width: 100%;
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
	gap: 0.625rem;
}

.right {
	display: flex;
	align-items: center;
}

.right * {
	margin-inline: auto;
}
</style>
