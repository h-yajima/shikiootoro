<template>
  <div v-if="question">
    <h2>{{ question.question }}</h2>
    <img v-if="question.image" :src="question.image" alt="Question Image" />
    <ul>
      <li v-for="option in question.options" :key="option">
        <button @click="selectAnswer(option)">{{ option }}</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading question...</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: false // 必須ではないように設定
    }
  },
  methods: {
    selectAnswer(option) {
      const isCorrect = option === this.question.answer;
      this.$emit('answerSelected', isCorrect);
    }
  }
};
</script>

<style scoped>
.question-container {
  text-align: center;
  margin: 20px;
}
img {
  max-width: 100%;
  height: auto;
}
.options {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>