<template>
  <div class="quiz-container">
    <div class="overlay"></div> <!-- 半透明のオーバーレイを追加 -->
    <div v-if="!modeSelected" class="mode-section vertical-mode-section">
      <button @click="selectMode('difficulty')" class="mode-button">難易度を選択して開始</button>
      <button @click="selectMode('all')" class="mode-button">すべての難易度から出題</button>
    </div>
    <div v-else-if="mode === 'difficulty' && !difficultySelected" class="difficulty-section">
      <select id="difficulty" v-model="selectedDifficulty" class="difficulty-select">
        <option value="easy">簡単</option>
        <option value="medium">普通</option>
        <option value="hard">難しい</option>
      </select>
      <button @click="startQuiz" class="start-button">クイズを開始</button>
    </div>
    <div v-else-if="!quizCompleted" class="question-section">
      <div class="question-progress">
        第{{ currentQuestionIndex + 1 }}問 ／ 全{{ questions.length }}問
      </div>
      <Question 
        :question="currentQuestion"
        :resetSelection="resetSelection"
        @answerSelected="handleAnswer"
      />
      <div class="navigation">
        <button @click="nextQuestion" :disabled="!answerSelected" class="next-button">次へ</button>
      </div>
    </div>
    <div v-else class="result-section">
      <div class="result-container"> <!-- 半透明の背景を追加 -->
        <h2 class="result-title">あなたのスコア: {{ score }} / {{ questions.length }}</h2>
        <button @click="restartQuiz" class="restart-button">戻る</button>
      </div>
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
      resetSelection: false, // 選択状態をリセットするフラグ
      mode: '', // 'difficulty' or 'all'
      modeSelected: false
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    selectMode(mode) {
      this.mode = mode;
      this.modeSelected = true;
      if (mode === 'all') {
        this.startQuiz();
      }
    },
    handleAnswer(isCorrect) {
      if (this.answerSelected) return; // すでに回答済みなら何もしない
      if (isCorrect) {
        this.score++;
      }
      this.answerSelected = true;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.answerSelected = false;
        this.resetSelection = true; // リセットフラグをオン
        this.$nextTick(() => {
          this.resetSelection = false; // リセットフラグをオフ
        });
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
      this.mode = '';
      this.modeSelected = false;
    },
    startQuiz() {
      if (this.mode === 'all') {
        // すべての難易度からランダムに10問出題
        this.questions = this.shuffleArray(questions.questions).slice(0, 10);
        this.difficultySelected = true;
      } else {
        this.difficultySelected = true; // 難易度が選択された状態にする
        this.loadQuestions();
      }
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
