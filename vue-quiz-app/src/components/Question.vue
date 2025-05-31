<template>
  <div class="question-container">
    <h2 class="question-title">{{ question.question }}</h2>
    <img v-if="question.image" :src="question.image" alt="Question Image" class="question-image" />
    <div class="answer-options">
      <button 
        v-for="(option, index) in question.options" 
        :key="index" 
        @click="selectAnswer(option, index)" 
        :class="['answer-button', { 'selected': selectedOptionIndex === index }]"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    resetSelection: Boolean // 親コンポーネントからリセットフラグを受け取る
  },
  data() {
    return {
      selectedOptionIndex: null // 選択されたボタンのインデックスを管理
    };
  },
  watch: {
    resetSelection(newValue) {
      if (newValue) {
        this.selectedOptionIndex = null; // 選択状態をリセット
      }
    }
  },
  methods: {
    selectAnswer(option, index) {
      this.selectedOptionIndex = index; // 選択されたボタンのインデックスを設定
      this.$emit('answerSelected', option === this.question.answer);
    }
  }
};
</script>

<style scoped>
.question-container {
  text-align: center;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 背景色を設定（白の半透明） */
  padding: 20px; /* 内側の余白を追加 */
  border-radius: 10px; /* 角を丸くする */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ボックスシャドウを追加 */
}

.question-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333; /* テキスト色を設定 */
}

.question-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.answer-options {
  display: flex;
  flex-direction: column; /* ボタンを縦に並べる */
  align-items: center;
  gap: 10px; /* ボタン間のスペースを設定 */
}

.answer-button {
  display: inline-block;
  width: 200px; /* ボタンの幅を固定 */
  height: 50px; /* ボタンの高さを固定 */
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.answer-button:hover {
  background-color: #5a6268;
}

.answer-button.selected {
  background-color: #007bff; /* 選択されたボタンの色 */
  color: #fff;
}
</style>