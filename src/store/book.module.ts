import { make } from 'vuex-pathify';
import Book from '@/models/Book.model';

const state = {
  selectedBooks: [],
};

const actions = {
  addOrRemoveBook: (context: any, book: Book): void => {
    const index = context.state.selectedBooks.findIndex((b: Book) => b.id === book.id);
    if (index > -1) {
      context.state.selectedBooks.splice(index, 1);
    } else {
      context.state.selectedBooks.push(book);
    }
  },
};

const mutations = make.mutations(state);

const getters = make.getters(state);

const namespaced = true;

const BookModule = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

export default BookModule;
