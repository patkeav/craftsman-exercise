<template>
  <div class="book">
      <h2 v-text="book.volumeInfo.title"></h2>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import Book from '../models/Book.model';

export default {
  props: {
    book: {
      type: Object as PropType<Book>,
    },
  },
};
</script>
<style lang="sass" scoped>
.book
  width: 100%
  padding: 0 12px 24px

  &__inner
      border: 1px solid #ccc

  @media (min-width: 960px)
    width: percentage(1/3)
</style>
