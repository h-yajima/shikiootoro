<template>
  <div class="question-container">
    <h2 class="question-title">{{ question.question }}</h2>
    <img :src="question.image" alt="Question Image" class="question-image" />
    <div class="answer-options">
      <button 
        v-for="(option, index) in question.options" 
        :key="index" 
        @click="selectAnswer(option)" 
        class="answer-button"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  methods: {
    selectAnswer(option) {
      this.$emit('answerSelected', option === this.question.answer);
    }
  }
};
</script>

<style scoped>
.question-container {
  text-align: center;
  margin-top: 20px;
}

.question-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
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
</style>