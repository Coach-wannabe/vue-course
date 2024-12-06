import { ref, computed } from 'vue';

export default {
  data() {
    return {
      filter: 'all', // 'all', 'completed', or 'incomplete'
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') return this.todos;
      if (this.filter === 'completed') return this.todos.filter((todo: any) => todo.completed);
      return this.todos.filter((todo: any) => !todo.completed);
    },
  },
};
