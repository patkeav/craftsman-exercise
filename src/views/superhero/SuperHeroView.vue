<template>
  <div class="books">
    <div v-for="book in state.books" :key="book.id" class="books-item">
      <BookItem :book="book" />
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, reactive } from 'vue';
import API_KEY from '../../assets/api.key';
import BookItem from '../../components/BookItem.vue';
import Book from '../../models/Book.model';

interface State {
  books: Book[]
}

const state: State = reactive({
  books: [],
});

async function getSuperHeroes() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=dark tower+inauthor:king&key=${API_KEY}`,
    );
    state.books = response.data.items;
    console.log(response.data.items);
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  getSuperHeroes();
});
</script>
<style lang="sass">
.books
  display: flex
  flex-wrap: wrap

.books-item
  padding: 0 12px 24px
  width: 100%
  @media (min-width: 960px)
    width: percentage(1/3)
</style>
