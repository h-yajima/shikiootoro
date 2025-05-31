import { createRouter, createWebHistory } from 'vue-router';
import Quiz from '../components/Quiz.vue';

const routes = [
  {
    path: '/',
    name: 'Quiz',
    component: Quiz
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;