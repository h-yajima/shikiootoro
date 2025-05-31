<template>
  <div id="app">
    <h1>おためしクイズアプリ</h1>
    <Quiz />
  </div>
</template>

<script>
import Quiz from './components/Quiz.vue';

export default {
  name: 'App',
  components: {
    Quiz
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>