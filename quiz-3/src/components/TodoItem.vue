<template>
    <li :class="{ completed: todo.completed }">
      <span @click="toggleTodo">{{ todo.text }}</span>
      <button @click="deleteTodo">Delete</button>
    </li>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TodoItem',
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },
    emits: ['delete', 'toggle'],
    methods: {
      toggleTodo() {
        this.$emit('toggle', this.todo.id);
      },
      deleteTodo() {
        this.$emit('delete', this.todo.id);
      },
    },
  });
  </script>
  
  <style>
  .completed {
    text-decoration: line-through;
  }
  </style>
  