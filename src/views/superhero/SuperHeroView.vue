<template>
  <div>
    <input
      type="text"
      v-model="state.search"
      class="books__search"
      placeholder="Type something to search!"
      @input="searchBooks"
    />
      <TransitionGroup
        name="fade"
        tag="div"
        class="books"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div v-for="book in state.books" :key="book.id" class="books__item" >
          <BookItem :book="book"  />
        </div>
      </TransitionGroup>
      <button value="Load More" @click="loadMore()" class="button">Load More</button>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { onBeforeMount, reactive, computed } from 'vue';
import gsap from 'gsap';
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
      `https://www.googleapis.com/books/v1/volumes?q=${state.search}+inauthor:stephen king&key=${API_KEY}`,
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
  } catch (error) {
    console.error(error);
  }
}

function onBeforeEnter(el) {
  el.style.opacity = 0;
  el.style.transform = 'translateX(-5px)';
}
function onEnter(el, done) {
  console.log(el.dataset);
  gsap.to(el, {
    opacity: 1,
    translateX: 0,
    onComplete: done,
  });
}
function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    translateX: -5,
    onComplete: done,
  });
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

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
