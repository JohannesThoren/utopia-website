<template>
	<div id="wrapper">
		<span></span>
		<div class="card">
			<div class="card-header title center-text">Profile Settings</div>
			<!-- {{data}} -->
			<div class="card-content" id="content">
				<p class="warning-fg center-text" v-if="err">{{err}}</p>
				<h4 id="Username">Username</h4>
				<input type="text" class="input" v-model="username" />
				<h4 id="ProfilePicture">Profile Picture Url</h4>
				<input type="url" class="input" v-model="profile_picture" />
				<img id="profile_picture" class="shadow" :src="selected_profile_picture" alt="" />
				<h4 id="Info">User Info</h4>
				<textarea
					v-model="info"
					class="text-area"
					name=""
					id=""
					cols="30"
					rows="10"
				></textarea>
				<button class="btn ok-bg" @click="save">Save Settings</button>
			</div>
		</div>
	</div>
</template>

<script>
import { api_get_call, api_post_call } from "../api_calls";

export default {
	data() {
		return {
			username: "",
			profile_picture: "",
			info: "",
			data: "",
			err: ""
		};
	},
	async created() {
		this.data = await api_get_call(
			this.$store.state.api_root,
			`user/get/token/${this.$cookie.get("token")}`
		);
		this.username = this.data.username;
		this.profile_picture = this.data.profile_picture;
		this.info = this.data.info;
	},
	computed: {
		selected_profile_picture() {
			return this.profile_picture;
		},
	},
	methods: {
		async save() {
			let token = this.$cookie.get("token")
			let body = {
				settings: {
					profile_picture: this.profile_picture,
					info: this.info,
					username: this.username,
				},
				token: token,
			};
			console.log(body)
			const response = await api_post_call(
				body,
				this.$store.state.api_root,
				"user/update"
			);

			if (response["response code"] != 200) {
				this.err = response.err;
			}else {
				this.$router.go()
			}

		},
	},
};
</script>

<style scoped>
#profile_picture {
	margin: auto;
	width: 100px;
	height: 100px;
	border-radius: 100%;
	border: 0.5px solid var(--accent-1);
}
#content {
	display: grid;
	gap: 10px;
}

#wrapper {
	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
	gap: 10px;
}
</style>