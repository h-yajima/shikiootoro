<template>
  <div class="quiz-container">
    <h1 class="title">クイズコンポーネント</h1>
    <div v-if="!difficultySelected" class="difficulty-section">
      <label for="difficulty" class="difficulty-label">難易度を選択してください:</label>
      <select id="difficulty" v-model="selectedDifficulty" class="difficulty-select">
        <option value="easy">簡単</option>
        <option value="medium">普通</option>
        <option value="hard">難しい</option>
      </select>
      <button @click="startQuiz" class="start-button">クイズを開始</button>
    </div>
    <div v-else-if="!quizCompleted" class="question-section">
      <Question 
        :question="currentQuestion"
        @answerSelected="handleAnswer"
      />
      <div class="navigation">
        <button @click="nextQuestion" :disabled="!answerSelected" class="next-button">次へ</button>
      </div>
    </div>
    <div v-else class="result-section">
      <h2 class="result-title">あなたのスコア: {{ score }} / {{ questions.length }}</h2>
      <button @click="restartQuiz" class="restart-button">クイズをリスタート</button>
    </div>
  </div>
</template>

<script>
import Question from './Question.vue';
import questions from '../data/questions.json';
import '../assets/styles/Quiz.css'; // スタイルシートをインポート

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
      quizCompleted: false,
      answerSelected: false,
      selectedDifficulty: 'easy', // 初期値を 'easy' に設定
      difficultySelected: false, // 難易度が選択されたかどうかを管理
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
      this.difficultySelected = false; // 難易度選択画面に戻る
    },
    startQuiz() {
      this.difficultySelected = true; // 難易度が選択された状態にする
      this.loadQuestions();
    },
    loadQuestions() {
      const allQuestions = questions.questions.filter(q => q.difficulty === this.selectedDifficulty);
      if (allQuestions.length === 0) {
        console.error('選択された難易度に対応する問題がありません。');
        return;
      }
      this.questions = this.shuffleArray(allQuestions).slice(0, Math.min(allQuestions.length, 10)); // 最大10問を選択
      console.log('読み込まれた問題:', this.questions); // デバッグ用ログ
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
};
</script>