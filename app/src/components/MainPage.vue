<template>
  <div>
    <Header />
    <MovieList :movies="context.movies" />
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { Options, Vue, setup } from "vue-class-component";
import MovieApi from "../infrastructure/movieApi";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "../store/index";
import Header from "./Header.vue";
import { MutationType } from "../store/mutations";
import MovieList from "./MovieList.vue";

@Options({
  props: {
    msg: String,
  },
  components: {
    Header,
    MovieList
  }
})
export default class HelloWorld extends Vue {
  msg!: string;
  context = setup(() => {
    const store = useStore();
    const getMovies = async () => {
      const movies = await MovieApi.getMovies();
      store.commit(MutationType.SetMovies, movies);
    };
    onMounted(getMovies);
    const movies = computed(() => store.state.movies);

    return { getMovies, movies }
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
