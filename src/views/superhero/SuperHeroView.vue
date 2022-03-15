<template>
  <div>
    <input
      type="text"
      v-model="state.search"
      class="books__search"
      placeholder="Type something to search!"
      @input="searchBooks"
    />
    <template v-if="state.books.length > 0">
      <div class="books">
        <div v-for="book in state.books" :key="book.id" class="books__item">
          <BookItem :book="book" />
        </div>
      </div>
      <input type="button" value="Load More" @click="loadMore()">
    </template>
    <template v-else>
      <h4>We're sorry, but we could not find any books with the title <span v-text="state.search"></span>.</h4>
    </template>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, reactive, computed } from 'vue';
import API_KEY from '../../assets/api.key';
import BookItem from '../../components/BookItem.vue';
import Book from '../../models/Book.model';

interface State {
  books: Book[];
  search: string;
  pageNum: number;
}

const state: State = reactive({
  books: [],
  search: '',
  pageNum: 0,
});

async function searchBooks() {
  try {
    console.log(state.search);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${state.search}&inauthor:stephen king&key=${API_KEY}`,
    );
    state.books = response.data.items;
  } catch (error) {
    console.error(error);
  }
}

async function getBooks() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:stephen king&key=${API_KEY}&startIndex=${state.pageNum}`,
    );
    state.books = [...state.books, ...response.data.items];

    console.log(response.data.items);
  } catch (error) {
    console.error(error);
  }
}

function loadMore() {
  state.pageNum += 10;
  getBooks();
}

onBeforeMount(() => {
  getBooks();
});
</script>
<style lang="sass">
.books
  display: flex
  flex-wrap: wrap
  margin-top: 25px

.books__item
  padding: 0 12px 24px
  width: 100%
  @media (min-width: 960px)
    width: percentage(1/3)

.books__search
  appearance: none
  -webkit-appearance: none
  border: 1px solid #ccc
  padding: 15px
  font-size: 16px
  width: 350px
</style>
