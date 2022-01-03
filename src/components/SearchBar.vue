<template>
	<div @mouseover="hover = true" @mouseleave="hover = false">
		<input
			type="text"
			id="search"
			class="input"
			placeholder="Search Utopia Forums..."
			v-model="searchQuery"
			autocomplete="off"
			@input="getResults"
		/>
		<ul class="card" id="results" v-if="hover">
			<li class="top-item">Search result for "<span class="ok-fg">{{searchQuery}}</span>"</li>
			<li v-for="result in results" :key="result.name">
				<board-link @click="$router.go()" :str_board_name="result.name" :str_board_id="result.id" :num_board_followers="result.followers" :bool_show_follow_btn="false"/>
			</li>
		</ul>
	</div>
</template>

<script>
import { api_get_call } from "../api_calls";
import BoardLink from "./BoardLink.vue";

export default {
	components: {
		BoardLink,
	},
	data() {
		return {
			results: {},
			hover: false,
			searchQuery: "",
		};
	},

	methods: {
		async getResults() {
			if (this.searchQuery == "") {
				this.results = {};
			}

			console.log(this.searchQuery);

			let data = await api_get_call(
				this.$store.state.api_root,
				`/search/boards/${this.searchQuery}`
			);
			this.results = data;
		},
	},
	computed: {
		searchResult() {
			return this.results;
		},
	},
};
</script>

<style scoped>
.top-item {color: lightgray; font-size: 1.2em; text-align: center}
#search {
	z-index: 100;
	width: 50vw;
	box-sizing: border-box;
}

#results {
	position: fixed;
	height: fit-content;
	padding: var(--padding-small);
	list-style-type: none;
	margin: 0;
	width:59.50rem;
	max-height: 400px;
	overflow-y: scroll;
}

</style>