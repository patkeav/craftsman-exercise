<template>
  <div class="wrapper">
    <input
        type="text"
        v-model="state.search"
        class="books__search"
        placeholder="Search for a specific horror"
        @input="searchBooks"
      />
      <button value="See Books" class="button">See Selected Books</button>
    <template v-if="state.loading">  <div class="loader"></div> </template>
    <template v-if="error"> We're sorry, but something went wrong. </template>
    <template v-if="!state.loading">

      <TransitionGroup
        name="fade"
        tag="div"
        class="books"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div v-for="book in state.books" :key="book.id" class="books__item">
          <BookItem :book="book" />

          <div class="books__select--wrap">
            <label for="selectBook" class="books__select">Select Book</label>
            <input type="checkbox" class="books__select" name="selectBook" id="selectBook" @change="toggleBook(book)" />
          </div>
        </div>
      </TransitionGroup>
      <button value="Load More" @click="loadMore()" class="button button--arrow">Load More</button>
    </template>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { onBeforeMount, reactive, computed } from 'vue';
import gsap from 'gsap';
import { useStore } from 'vuex';
import API_KEY from '../../assets/api.key';
import Book from '../../models/Book.model';
import BookItem from '../../components/BookItem.vue';

interface State {
  books: Book[];
  search: string;
  pageNum: number;
  loading: boolean;
  error: string;
}

const state: State = reactive({
  books: [],
  search: '',
  pageNum: 0,
  loading: true,
  error: '',
});

const store = useStore();

const selected = store.getters['books/selectedBooks'];

async function searchBooks() {
  state.loading = true;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${state.search}+inauthor:stephen king&key=${API_KEY}`,
    );
    state.books = response.data.items;
  } catch (error) {
    state.error = error;
  } finally {
    setTimeout(() => {
      state.loading = false;
    }, 1000);
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
  } finally {
    setTimeout(() => {
      state.loading = false;
    }, 1000);
  }
}

function toggleBook(book: Book) {
  store.dispatch('books/addOrRemoveBook', book);
}

function onBeforeEnter(el) {
  el.style.opacity = 0;
  el.style.transform = 'translateX(-5px)';
}
function onEnter(el, done) {
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
$color: #830c06

.wrapper
  max-width: 1200px
  margin: 0 auto
  display: block

.books
  display: flex
  flex-wrap: wrap
  margin-top: 25px
  text-align: left
  &__search
    appearance: none
    -webkit-appearance: none
    border: 1px solid #ccc
    padding: 15px
    font-size: 16px
    width: 350px
  &__item
    padding: 0 12px 24px
    margin-bottom: 15px
    width: 100%
    @media (min-width: 960px)
      width: percentage(1/3)
  &__select
    color: #fff
    margin-bottom: 5px
    &--wrap
      margin: 10px 0

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0

.loader
  height: 75px
  width: 75px
  position: relative
  left: 0
  right: 0
  top: 0
  bottom: 0
  margin: 50px auto
  &:before
    content: ''
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    height: 100%
    width: 100%

    filter: contrast(200%)

    border-width: 25px
    border-style: solid
    border-top-color: darken($color, 15%)
    border-right-color: lighten($color, 15%)
    border-bottom-color: lighten($color, 50%)
    border-left-color: $color
    border-radius: 100%

    animation: load 1.5s linear infinite

@keyframes load
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
