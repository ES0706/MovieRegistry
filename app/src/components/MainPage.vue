<template>
  <div>
    <ul>
      <li v-for="item in movies" :key="item.name">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from "@vue/reactivity";
import { Options, Vue } from "vue-class-component";
import IMovie from "../interfaces/IMovie";
import MovieApi from "../infrastructure/movieApi";
import { onMounted } from "@vue/runtime-core";
import useMovieRepositories from "../composables/useMovieRepositories";

@Options({
  props: {
    msg: String,
  },
  setup(props: any){
    const { movies, getMovies } = useMovieRepositories();

    return {
      repositories: getMovies,
      movies
    };
  }
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
