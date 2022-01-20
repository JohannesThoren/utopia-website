<template>
	<div>
		<div id="background" @click="$emit('close-new-board')"></div>

		<div id="new-board" class="card center-item">
			<div class="card-header">
				<div class="title center-text">Create a New Board</div>
			</div>
			<div class="card-content">
				<p class="center-text">{{ msg }}</p>
				<p class="warning-fg center-text">{{ err }}</p>
				<input
					v-model="str_board_name"
					class="input"
					type="text"
					placeholder="Board Name"
				/>
				<textarea
					v-model="str_board_description"
					class="text-area"
					name=""
					id=""
					cols="30"
					rows="10"
					placeholder="Board Description"
				></textarea>
				<button class="btn" @click="create()">Create</button>
			</div>
		</div>
	</div>
</template>


<script>
import { api_post_call } from "../api_calls";

export default {
	name: "NewBoard",
	data() {
		return {
			str_board_name: "",
			str_board_description: "",
			str_user_token: this.$cookie.get("token"),

			err: "",
			msg: "",
		};
	},
	methods: {
		async create() {
			const body = {
				token: this.str_user_token,
				name: this.str_board_name,
				description: this.str_board_description,
			};
			let data = await api_post_call(
				body,
				this.$store.state.api_root,
				"board/new"
			);

			if (data["response code"] == 200) {
				this.$router.go();
				this.$emit("close-new-board");
				return data;
			} else {
				this.msg = data.msg;
				this.err = data.err;
			}
		},
	},
};
</script>

<style scoped>
.card-content {
	display: grid;
}
.card-content * {
	margin-bottom: 10px;
}

#new-board {
	width: 50%;
	top: 5%;
	position: absolute;
	left: 25%;
	right: 25%;
	z-index: 101;
}

#background {
	z-index: 100;
	position: absolute;
	background-color: rgba(10, 10, 10, 0.8);
	height: 100vh;
	width: 100%;
}
</style>