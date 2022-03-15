<template>
  <div class="book">
    <div class="book__inner">
      <img :src="book.volumeInfo.imageLinks?.smallThumbnail" class="book__image" />

      <div class="book__info">
        <h2 v-text="ellipses(book.volumeInfo.title)"></h2>
        <div v-text="`by ${formatAuthors(book.volumeInfo.authors)}`" v-if="book.volumeInfo.authors"></div>
        <div class="book__additional">
          <h4 v-text="`Published by ${book.volumeInfo.publisher}`" v-if="book.volumeInfo.publisher"></h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from 'vue';
import Book from '../models/Book.model';

export default {
  props: {
    book: {
      type: Object as PropType<Book>,
    },
  },
  methods: {
    formatAuthors(authors: string[]): string {
      return authors ? authors.join(', ') : '';
    },
    ellipses(title: string): string {
      return `${title.substring(0, 15)} ...`;
    },
  },
};
</script>
<style lang="sass" scoped>
.book
  background-color: #fff
  box-shadow: 0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)

  &__inner
    display: flex
    align-items: flex-start
    justify-content: space-between

  &__info
    padding: 0 12px
  &__additional
    margin-top: auto
  &__image
    width: 128px
    height: 232px
</style>
