import { createStore } from 'vuex';
import BookModule from './book.module';

export default createStore({
  state: {
    version: '1.0',
  },
  modules: {
    books: BookModule,
  },
});
