<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Year
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Length
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Categories
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Release Date
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Director
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Writer
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Actors
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="movie in movies" :key="movie.name">
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-bg text-gray-900 text-left
                  "
                >
                  {{ movie.name }}
                </td>
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900 text-center
                  "
                >
                  {{ movie.year }}
                </td>
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900 text-center
                  "
                >
                  {{ movie.runtime }}
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="items-center">
                    <div
                      v-for="category in movie.categories"
                      :key="category"
                      class="ml-1"
                    >
                      <span
                        class="
                          px-2
                          inline-flex
                          text-xs
                          leading-5
                          font-semibold
                          rounded-full
                          bg-green-100
                          text-green-800
                        "
                      >
                        {{ category }}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900 text-center
                  "
                >
                  {{ movie.releaseDate }}
                </td>
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900 text-center
                  "
                >
                  {{ movie.director }}
                </td>
                <td
                  class="
                    px-3
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900 text-center
                    tableLongRow
                  "
                >
                  <div class="items-center">
                    <div v-if="Array.isArray(movie.writer)">
                      <div
                        v-for="writerItem in movie.writer"
                        :key="writerItem"
                        class="ml-1"
                      >
                        {{ writerItem }}
                      </div>
                    </div>
                    <div v-else>
                      {{ movie.writer }}
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="items-center text-sm tableLongRow">
                    <div
                      v-for="actor in movie.actors"
                      :key="actor"
                      class="ml-1"
                    >
                      {{ actor }}
                    </div>
                  </div>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-nowrap
                    text-right text-sm
                    font-medium
                  "
                >
                  <a
                    href="#"
                    @click="editClicked(movie)"
                    class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                  <br />
                  <a
                    href="#"
                    @click="deleteClicked(movie)"
                    class="text-indigo-600 hover:text-indigo-900"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IMovie from "../interfaces/IMovie";

@Options({
  props: {
    movies: Array,
  },
})
export default class MovieList extends Vue {
  movies!: Array<IMovie>;
  private editClicked(movie: IMovie) {
    this.$emit("edit-clicked", movie);
  }
  private deleteClicked(movie: IMovie) {
    this.$emit("delete-clicked", movie);
  }
}
</script>

<style lang="less" scoped>
.tableLongRow {
  height: 80px;
  overflow: auto;
}
</style>
