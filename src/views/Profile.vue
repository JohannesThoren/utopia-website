// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<div>
		<SiteHeader />
		<div id="wrapper">
			<div id="side" class="card center-item">
				<div class="card-header">
					<div class="title center-text">{{ name }}'s Info</div>
				</div>
				<div class="center-text card-content">
					<img id="img" :src="image" />
					<pre id="description" class="background-accent-2">
            <span class="subtitle">Description</span>
            {{ description }}
            <button  class="btn" v-if="currentUserId ==  $route.params.id && $store.state.authorized">Edit Description</button>
          </pre>
				</div>
			</div>
			<ProfilePostList />
			<div id="side" class="card center-item">
				<div class="card-header">
					<div class="title center-text">{{ name }}'s Boards</div>
					<div class="card-content">
						<div v-for="board in boards" :key="board.name">
							<div id="board">
								<router-link
									class="board-name"
									:to="'/b/' + board['id']"
									>{{ board["name"] }}</router-link
								>
								<div id="followers">
									<i class="fas fa-user-friends"></i>
									Followers
									{{ board["followers"] }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProfilePostList from "../components/ProfilePostList.vue";
import { api_get_call } from "../api_calls.js";

export default {
	name: "Profile",
	components: {
		ProfilePostList,
	},
	data() {
		return {
			image: "",
			name: "",
			description: "",
			currentUserId: "",
			arr_boards: [],
		};
	},
	computed: {
		boards() {
			return this.arr_boards;
		},
	},
	async created() {
		if (this.$cookie.get("token")) {
			const token = this.$cookie.get("token");
			const data = await api_get_call(
				this.$store.state.api_root,
				`user/get/token/${token}`
			);
			this.currentUserId = data["id"];
		}

		const user = await api_get_call(
			this.$store.state.api_root,
			`user/get/id/${this.$route.params.id}`
		);
		this.image = user["profile_picture"];
		this.name = user["username"];
		this.description = user["description"];

		console.log(user);

		const boards = await api_get_call(
			this.$store.state.api_root,
			`user/get/boards/${this.$route.params.id}`
		);
		for (let board in boards) {
			this.boards.push(boards[board]);
			console.log(boards[board]);
			console.log(this.boards[0].name);
		}
	},
};
</script>

<style scoped>
.card {
	margin-top: 10px;
	width: 100%;
}

#followers {text-align: center;}

#side {
	width: 95%;
}

#description {
	display: grid;
	text-align: left;
	border-left: 4px solid var(--accent-2);
	padding: 5px;
}

#img {
	width: 200px;
	height: 200px;
	border: 2px solid var(--accent-1);
	border-radius: 100%;
	margin: 10px;
}
#wrapper {
	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
}
.title {
	margin: 0px;
}

#board {
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	margin-top: 5px;
	margin-bottom: 5px;
}

.board-name {
	font-size: 1em;
}
</style>
