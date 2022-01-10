<template>
	<div class="comment card shadow">
		<avatar :user_id="user_id" />
		<p class="commentText">{{ comment }}</p>
		<p class="date">{{ date }}</p>
	</div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
	components: { Avatar },
	props: {
		comment: String,
		user_id: String,
		date: String,
	},
};
</script>

<style scoped>
.comment {
	padding: var(--padding-medium);
}

.commentText {
	font-size: 1em;
}

.date {
	font-size: 0.8em;
}
</style>