<template>
  <div class="quiz-container">
    <h1>Quiz Component</h1>
    <div v-if="!quizCompleted">
      <Question 
        :question="currentQuestion"
        @answerSelected="handleAnswer"
      />
      <div class="navigation">
        <button @click="nextQuestion" :disabled="!answerSelected">Next</button>
      </div>
    </div>
    <div v-else>
      <h2>Your Score: {{ score }} / {{ totalQuestions }}</h2>
      <button @click="restartQuiz">Restart Quiz</button>
    </div>
  </div>
</template>

<script>
import Question from './Question.vue';
import questions from '../data/questions.json';

export default {
  name: "Quiz",
  components: {
    Question
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: 10,
      quizCompleted: false,
      answerSelected: false,
      selectedDifficulty: 'easy', // デフォルトの難易度を設定
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    handleAnswer(isCorrect) {
      if (isCorrect) {
        this.score++;
      }
      this.answerSelected = true; // ボタンを活性化するために true に設定
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.answerSelected = false;
      } else {
        this.quizCompleted = true;
      }
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.quizCompleted = false;
      this.answerSelected = false;
      this.loadQuestions();
    },
    loadQuestions() {
      const allQuestions = questions.questions.filter(q => q.difficulty === this.selectedDifficulty);
      if (allQuestions.length === 0) {
        console.error('No questions available for the selected difficulty.');
        return;
      }
      this.questions = this.shuffleArray(allQuestions).slice(0, this.totalQuestions);
      console.log('Loaded questions:', this.questions); // デバッグ用ログ
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  },
  mounted() {
    this.loadQuestions();
  }
};
</script>

<style scoped>
.quiz-container {
  text-align: center;
}
.navigation {
  margin-top: 20px;
}
</style>