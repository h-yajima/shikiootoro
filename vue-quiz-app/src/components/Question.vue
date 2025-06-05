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