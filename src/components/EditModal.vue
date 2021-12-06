<template>
<div class="flex justify-center h-screen items-center bg-gray-200 antialiased modal bg-opacity-75">
      <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div
          class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <p class="font-semibold text-gray-800">{{ title }}</p>
          <a href="#" @click="emitCloseModal">
              <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          </a>
        </div>
        <div class="flex flex-col px-6 py-5 bg-gray-50">
        <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
            <div class="w-full sm:w-1/2">
              <p class="mb-2 font-semibold text-gray-700">Name</p>
              <input type="text"
                v-model="movieModel.name"
               class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
               :disabled="editMode" />
            </div>
            <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
              <p class="mb-2 font-semibold text-gray-700">Year</p>
              <input type="number" min="1900" max="2099" step="1" v-model="movieModel.year" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
            <div class="w-full sm:w-1/2">
              <p class="mb-2 font-semibold text-gray-700">Runtime</p>
              <input type="number" min="1" max="1000" step="1" v-model="movieModel.runtime" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
            <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
              <p class="mb-2 font-semibold text-gray-700">Categories</p>
              <input type="text"
                :value="getValuesSeparatedByComma('categories')"
                @change="changeValueInModelSeparatedByComma('categories', $event.target.value)"
               class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
            <div class="w-full sm:w-1/2">
              <p class="mb-2 font-semibold text-gray-700">Release Date</p>
              <input type="date" v-model="movieModel.releaseDate" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
            <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
              <p class="mb-2 font-semibold text-gray-700">Director</p>
              <input type="text"
                v-model="movieModel.director"
               class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
            <div class="w-full sm:w-1/2">
              <p class="mb-2 font-semibold text-gray-700">Writer</p>
              <input type="text"
                :value="getValuesSeparatedByComma('writer')"
                @change="changeValueInModelSeparatedByComma('writer', $event.target.value)"
               class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
            <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
              <p class="mb-2 font-semibold text-gray-700">Actors</p>
              <input type="text"
                :value="getValuesSeparatedByComma('actors')"
                @change="changeValueInModelSeparatedByComma('actors', $event.target.value)"
               class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" />
            </div>
          </div>
          <p class="mb-2 font-semibold text-gray-700">Story</p>
          <textarea
            type="text"
            name=""
            v-model="movieModel.storyline"
            placeholder="Type a story..."
            class="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
          >
          </textarea>
        </div>
        <div
          class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <a href="#" class="font-semibold text-gray-600" @click="emitCloseModal">Cancel</a>
          <button class="px-4 py-2 text-white font-semibold bg-blue-500 rounded" @click="submitChangedObject">
            Save
          </button>
        </div>
      </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IMovie from "../interfaces/IMovie";

@Options({
    props: {
        movie: Object,
        title: String,
        editMode: Boolean
    }
})
export default class EditModal extends Vue {
    movie!: IMovie;
    title!: string;
    editMode!: boolean;
    movieModel: IMovie = {
        name: '',
        year: 0,
        runtime: 0,
        categories: [],
        releaseDate: '',
        director: '',
        writer: [],
        actors: [],
        storyline: ''
    };

    created() {
        this.movieModel = { ...this.movie };
    }
    getValuesSeparatedByComma(property: string) {
        const value = (this.movieModel as any)[property];
        if (Array.isArray(value)) {
            return value.join();
        } else {
            return value;
        }
    }
    changeValueInModelSeparatedByComma(property: string, value: string) {
        (this.movieModel as any)[property] = value.split(',');
    }
    emitCloseModal(){
        this.$emit("close-modal");
    }
    submitChangedObject(){
        this.$emit("movie-saved", this.movieModel);
    }
}
</script>

<style lang="less">
.modal {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
}
</style>
