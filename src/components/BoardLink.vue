<template>
	<div id="board_link">
		<router-link :to="'/b/' + str_board_id" id="link">{{
			str_board_name
		}}</router-link>
		<div id="followers" class="center-item">
			<i class="fas fa-user-friends"></i> {{ num_board_followers }}
		</div>
		<div v-if="$store.state.authorized && bool_show_follow_btn">
			<button
				class="btn center-item"
				id="follow"
				v-if="!bool_user_following"
				@click="fn_follow(str_board_id)"
			>
				Follow
			</button>
			<button
				@click="fn_unfollow(str_board_id)"
				class="btn warning-bg center-item"
				id="unfollow"
				v-if="bool_user_following"
			>
				Unfollow
			</button>
		</div>
		<div v-else id="followers-text"><span>Followers</span></div>
	</div> 
</template>

<script>
import { api_post_call } from "../api_calls";

export default {
	Name: "BoardLink",
	data() {
		return {};
	},
	props: {
		str_board_name: String,
		str_board_id: String,
		num_board_followers: Number,
		bool_user_following: Boolean,
		bool_show_follow_btn: Boolean,
	},
	methods: {
		async fn_follow(id) {
			const body = { token: this.$cookie.get("token") };
			const resp = await api_post_call(
				body,
				this.$store.state.api_root,
				`board/${id}/follow`
			);
			this.$router.go();
			return resp;
		},

		async fn_unfollow(id) {
			const body = { token: this.$cookie.get("token") };
			const resp = await api_post_call(
				body,
				this.$store.state.api_root,
				`board/${id}/unfollow`
			);
			this.$router.go();
			return resp;
		},
	},
};
</script>

<style scoped>
.btn {
	width: 60%;
	max-height: 25px;
	font-size: 1em;
}

#link {
	text-decoration: none;
}
#followers-text {text-align: center;}

#board_link {
	display: grid;
	grid-template-columns: 1.5fr 0.5fr 1fr;
	padding: var(--padding-small);
	align-items: center;
}
</style>
