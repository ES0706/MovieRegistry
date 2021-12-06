<template>
  <div>
    <Header @add-movie="addClicked" />
    <MovieList
      :movies="context.movies"
      @edit-clicked="editClicked"
      @delete-clicked="deleteClicked"
    />
    <EditModal
      v-if="showModal"
      :movie="movieToEdit"
      :title="modalTitle"
      :editMode="editMode"
      @close-modal="closeModal"
      @movie-saved="movieSaved"
    />
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { Options, Vue, setup } from "vue-class-component";
import MovieApi from "../infrastructure/movieApi";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "../store/index";
import Header from "./Header.vue";
import { MutationType } from "../store/mutations";
import MovieList from "./MovieList.vue";
import EditModal from "./EditModal.vue";
import IMovie from "../interfaces/IMovie";
import { ActionTypes } from "../store/actions";

@Options({
  components: {
    Header,
    MovieList,
    EditModal,
  },
})
export default class HelloWorld extends Vue {
  store = useStore();
  showModal = false;
  editMode = false;
  modalTitle = "";
  movieToEdit: IMovie = {
    name: "",
    year: 0,
    runtime: 0,
    categories: [],
    releaseDate: "",
    director: "",
    writer: [],
    actors: [],
    storyline: "",
  };
  context = setup(() => {
    const getMovies = async () => {
      const movies = await MovieApi.getMovies();
      this.store.commit(MutationType.SetMovies, movies);
    };
    onMounted(getMovies);
    const movies = computed(() => this.store.state.movies);
    const isLoading = computed(() => this.store.state.isLoading);
    watch(isLoading, (val, oldVal) => {
      if (oldVal === true) {
        this.showModal = false;
      } else {
        this.showModal = true;
      }
    });

    return { getMovies, movies, isLoading };
  });

  addClicked() {
    this.modalTitle = "Add a movie";
    this.editMode = false;
    this.openModal();
  }

  editClicked(movie: IMovie) {
    this.movieToEdit = movie;
    this.modalTitle = "Edit Movie";
    this.editMode = true;
    this.openModal();
  }

  deleteClicked(movie: IMovie) {
    this.store.dispatch(ActionTypes.DeleteMovie, movie.name);
  }

  movieSaved(movie: IMovie) {
    if (this.editMode) {
      this.store.dispatch(ActionTypes.SetEditModal, movie);
    } else {
      this.store.dispatch(ActionTypes.SetAddModal, movie);
    }
  }

  closeModal() {
    this.showModal = false;
  }
  openModal() {
    this.showModal = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
