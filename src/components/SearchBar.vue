<template>
	<input
		type="text"
		id="search"
		class="input"
		placeholder="Search Utopia Forums..."
		v-model="searchQuery"
		autocomplete="off"
		@focus="showResults = true"
            @input="getResults"
	/>
	<div v-if="showResults" id="result-window" class="card">
		<div class="card-content">
			<p id="query-text">
				Search results for "<span class="ok-fg">{{ searchQuery }}</span
				>"
			</p>

			<ul class="results" v-if="results" :key="searchQuery">
				<li  v-for="result in results" :key="result.id">
                              <BoardLink :str_board_id="result.id" :str_board_name="result.name" :num_board_followers="result.followers"/>
                        </li>
			</ul>

			<p id="heads-up-text">for accurate results specify your search query</p>
		</div>
	</div>
</template>

<script>
import {api_get_call} from "../api_calls"
import BoardLink from "./BoardLink.vue"

export default {
      components: {
            BoardLink
      },
	data() {
		return {
                  results: {"name": "none"},
			showResults: false,
			searchQuery: "",
		};
	},

      methods: {
            async getResults() {
                  if (this.searchQuery == "") {
                        this.results = {}
                  }

                  console.log(this.searchQuery)
                  
                  let data = await api_get_call(this.$store.state.api_root, `/search/boards/${this.searchQuery}`);
                  this.results = data
                  
            }
      },
      computed: {
            searchResult() {
                  return this.results
            }
      }
      
};
</script>

<style scoped>
#query-text {
	color: lightgray;
	font-size: 1.2em;
}

#heads-up-text {
      color: lightgray;
      font-size: .95em;
}

#search {
	width: 100%;
}

#result-window {
	margin-top: 40px;
	width: 50%;
	position: absolute;
	z-index: 1000;
}

.results {
	list-style: none;
	padding: 0px;
	margin: 0px;

	max-height: 400px;
	overflow-y: scroll;
}
</style>