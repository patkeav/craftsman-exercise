<template>
  <div class="select-books">
    <router-link :to="{ name: 'Books' }" class="button">Head back</router-link>
    <template v-if="selected.length > 0">
      <h1>See your selected books:</h1>

      <div class="selected">
        <div class="selected__book" v-for="s in selected" :key="s.id">
          <BookItem :book="s" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-books">
        Please select a few books at <router-link :to="{ name: 'Books' }">the book catalogue.</router-link>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { useStore } from 'vuex';
import BookItem from '../../components/BookItem.vue';

const store = useStore();

const selected = store.getters['books/selectedBooks'];
</script>
<style lang="sass" scoped>
.select-books
    color: #fff
.no-books
    display: block
    margin: 50px auto
    text-align: center
.selected
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    padding: 50px
    &__book
       width: 50%
       margin: 15px
</style>
