<template>
	<div id="background" v-if="showResults" @click="showResults = false"></div>
	<input
		type="text"
		id="search"
		class="input"
		placeholder="Search Utopia Forums..."
		v-model="searchQuery"
		autocomplete="off"
		@input="getResults"
		@focus="showResults = true"
	/>
	<ul class="card" id="results" v-if="showResults">
		<li class="top-item">
			Search result for "<span class="ok-fg">{{ searchQuery }}</span
			>"
		</li>
		<li
			v-for="result in results"
			:key="result.name"
			@click="
				showResults = false;
				$router.go();
			"
		>
			<board-link
				:str_board_name="result.name"
				:str_board_id="result.id"
				:num_board_followers="result.followers"
				:bool_show_follow_btn="false"
			/>
		</li>
	</ul>
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
			showResults: false,
			searchQuery: "",
		};
	},

	methods: {
		async getResults() {
			if (this.searchQuery == "") {
				this.results = {};
			}
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
.top-item {
	color: lightgray;
	font-size: 1.2em;
	text-align: center;
}
#background {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 500;
	background-color: rgba(10, 10, 10, 0.8);
}

#search {
	z-index: 100;
	width: 50vw;
	box-sizing: border-box;
	z-index: 1000;
	background-color: white;
}

#search:focus {
	position: relative;
	box-sizing: border-box;
	z-index: 1000;
}

#results {
	position: fixed;
	height: fit-content;
	padding: var(--padding-small);
	list-style-type: none;
	margin: 0;
	width: 50vw;
	max-height: 25rem;
	overflow-y: scroll;
	box-sizing: border-box;
	z-index: 1000;
}
</style>