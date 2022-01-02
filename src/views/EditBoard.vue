<template>
	<div id="wrapper">
		<span></span>
		<div v-if="currentOwner == $store.state.user.id" class="card">
			<div class="card-header title center-text">Board Settings</div>
			<div class="card-content" id="content">
				<p class="warning-fg center-text" v-if="err">{{ err }}</p>
				<h4 id="BoardName">Board Name</h4>
				<input type="text" class="input" v-model="boardName" />
				<h4 id="ProfilePicture">Board Owner</h4>
				<input type="text" class="input" v-model="boardOwnerId" />
				<Avatar v-if="boardOwnerId" class="center-item" :user_id="owner" :key="owner"/>
				<h4>Board Description</h4>
				<textarea
					v-model="boardDescription"
					class="text-area"
					name=""
					id=""
					cols="30"
					rows="10"
				></textarea>
				<button class="btn ok-bg" @click="save">Save Settings</button>

				<!-- <h4>Delete Board</h4>
				<p>
					By pressing the delete button the board will be marked as deleted,
					it's data will not be deleted so it is possible to recover the board
					and it's data. To delete the board from our databases you have to
					contact us. Contact mail: Johannes@lgjt.xyz
				</p>
				<button class="btn warning-bg">Delete Board</button> -->
			</div>
		</div>

		<h1 class="center-text" v-else>
			You are not allowed to change the info and settings of this board!
		</h1>
	</div>
</template>

<script>
import { api_get_call, api_post_call } from "../api_calls";
import Avatar from "../components/Avatar";
export default {
	components: { Avatar },
	data() {
		return {
			boardName: "",
			currentOwner: "",
			boardOwnerId: "",
			boardDescription: "",
			data: "",
			err: "",
		};
	},
	async created() {
		this.data = await api_get_call(
			this.$store.state.api_root,
			`/board/get/id/${this.$route.params.id}`
		);
		this.boardName = this.data.name;
		this.boardOwnerId = this.data.owner;
		this.currentOwner = this.data.owner;
		this.boardDescription = this.data.description;
	},
	computed: {
		selected_profile_picture() {
			return this.profile_picture;
		},

		owner() {
			return this.boardOwnerId
		}
	},
	methods: {
		async save() {
			let token = this.$cookie.get("token");
			let body = {
				settings: {
					name: this.boardName,
					description: this.boardDescription,
					owner: this.boardOwnerId,
				},
				token: token,
			};
			console.log(body);
			const response = await api_post_call(
				body,
				this.$store.state.api_root,
				`/board/${this.$route.params.id}/update/`
			);

			if (response["response code"] != 200) {
				this.err = response.err;
			} else {
				this.$router.go();
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