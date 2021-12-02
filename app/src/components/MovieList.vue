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
import { Options, Vue } from "vue-class-component";
import IMovie from "../interfaces/IMovie";

@Options({
    props: {
        movies: Array
    }
})
export default class MovieList extends Vue {
    movies!: Array<IMovie>;
}
</script>

<style lang="less">

</style>
