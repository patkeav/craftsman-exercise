<template>
  <div>{{ state.books }}</div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, reactive } from 'vue';
import API_KEY from '../../assets/api.key';

interface Volume {
  allowAnonLogging: boolean;
  authors: string[];
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: unknown;
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: { containsEpubBubbles: boolean; containsImageBubbles: boolean };
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  readingModes: { text: boolean; image: boolean };
  subtitle: string;
  title: string;
}

interface Book {
  accessInfo: unknown;
  etag: string;
  id: string;
  kind: string;
  saleInfo: unknown;
  searchInfo: unknown;
  selfLink: string;
  volumeInfo: Volume;
}

interface State {
  books: Book[]
}

const state = reactive({
  books: [],
});

async function getSuperHeroes() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=dark tower+inauthor:king&key=${API_KEY}`,
    );
    state.books = response.data.items;
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  getSuperHeroes();
});
</script>
