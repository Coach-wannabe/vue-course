<template>
  <div>
    <h2>To-Do List</h2>
    <input v-model="newTodo" placeholder="Add a new task" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>

    <div class="filters">
      <label>
        <input type="radio" value="all" v-model="filter" /> All
      </label>
      <label>
        <input type="radio" value="completed" v-model="filter" /> Completed
      </label>
      <label>
        <input type="radio" value="incomplete" v-model="filter" /> Incomplete
      </label>
    </div>

    <transition-group name="fade" tag="ul" class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo"
        @toggle="toggleStatus"
      />
    </transition-group>
  </div>
</template>

  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import TodoItem from './TodoItem.vue';
  import filterMixin from '../mixins/filterMixin';
  
  export default defineComponent({
    name: 'TodoList',
    components: { TodoItem },
    mixins: [filterMixin],
    data() {
      return {
        newTodo: '',
        todos: [
          { id: 1, text: 'Learn Vue 3', completed: false },
          { id: 2, text: 'Build a project', completed: true },
        ],
      };
    },
    methods: {
      addTodo() {
        if (!this.newTodo.trim()) return;
        this.todos.push({
          id: Date.now(),
          text: this.newTodo,
          completed: false,
        });
        this.newTodo = '';
      },
      deleteTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      toggleStatus(id: number) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) todo.completed = !todo.completed;
      },
    },
  });
  </script>
  
  <style>
  .todo-list {
    list-style: none;
    padding: 0;
  }
  .filters {
    margin: 10px 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  