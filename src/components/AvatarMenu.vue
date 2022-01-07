// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


// TODO add a new avatar with a dropdown.
// it should only be a profile pic and if you click it
// dropdown should appere
<template>
	<div @mouseover="hover = true" @mouseleave="hover = false">
		<Avatar ref="avatar" id="avatar" :user_id="id" />
		<ul :style="{ width: '12.5rem' }" class="card" id="menu" v-if="hover">
			<li>
				<router-link to="/settings">Settings</router-link>
			</li>
			<li>
				<button @click="fn_on_sign_out"  id="sign-out-btn" class="btn warning-bg">Sign Out</button>
			</li>
		</ul>
	</div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
	name: "AvatarMenu",
	components: { Avatar },
	data() {
		return {
			id: this.$store.state.user["id"],
			b_show_menu: false,
			hover: false,
		};
	},
	methods: {
		fn_on_sign_out() {
			this.$store.commit("unauthorize");
			this.$store.commit("set_user", []);
			this.$cookie.remove("token");
			this.$router.go();
		},
	},
	mounted() {
		console.log(this.avatar_width);
	},
};
</script>

<style scoped>
.card {min-height: 0rem;}
li {margin-top: 0.3125rem; margin-bottom: 0.3125rem;}

#avatar {
	z-index: 100;
}

#menu {
	top: 50px;
	position: fixed;
	border: 0.5008px solid var(--accent-2);
	height: fit-content;
	padding: var(--padding-small);
	list-style-type: none;
	margin: 0;
}
#sign-out-btn {
	bottom: 0;
	top: 100;
}
</style>