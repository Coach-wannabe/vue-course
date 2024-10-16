<template>
  <div id="app">
    <h1>Person List</h1>
    <PersonList />
  </div>
</template>

<script>
import PersonList from './components/PersonList.vue';

export default {
  name: 'App',
  components: {
    PersonList
  }
};
</script>

<style>
#app {
  background: url("@/assets/Background.webp") no-repeat center center fixed;
  background-size: cover; 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  min-height: 100vh;
  margin-top: 20px;
  padding: 20px; 
}
</style>
