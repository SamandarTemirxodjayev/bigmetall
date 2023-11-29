<template>
  <div class="calculator border border-gray-300">
    <input
      ref="calculatorInput"
      v-model="input"
      class="input"
      type="text"
      autofocus
    />
    <div class="buttons">
      <button @click="appendToInput('7')" class="button">7</button>
      <button @click="appendToInput('8')" class="button">8</button>
      <button @click="appendToInput('9')" class="button">9</button>
      <button @click="appendToInput('+')" class="operator">+</button>
      <button @click="appendToInput('4')" class="button">4</button>
      <button @click="appendToInput('5')" class="button">5</button>
      <button @click="appendToInput('6')" class="button">6</button>
      <button @click="appendToInput('-')" class="operator">-</button>
      <button @click="appendToInput('1')" class="button">1</button>
      <button @click="appendToInput('2')" class="button">2</button>
      <button @click="appendToInput('3')" class="button">3</button>
      <button @click="appendToInput('*')" class="operator">*</button>
      <button @click="appendToInput('0')" class="button">0</button>
      <button @click="clearInput" class="clear">C</button>
      <button @click="calculateResult" class="equal">=</button>
      <button @click="appendToInput('/')" class="operator">/</button>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    const calculatorInput = ref(null);

    const input = ref("");

    const result = computed(() => {
      try {
        return eval(input.value);
      } catch (error) {
        return "Error";
      }
    });

    const appendToInput = (value) => {
      input.value += value;
      calculatorInput.value.focus();
    };

    const clearInput = () => {
      input.value = "";
      calculatorInput.value.focus();
    };

    const calculateResult = () => {
      input.value = result.value.toString();
      calculatorInput.value.focus();
    };

    onMounted(() => {
      calculatorInput.value.focus();
    });

    return {
      input,
      result,
      appendToInput,
      clearInput,
      calculateResult,
      calculatorInput,
    };
  },
};
</script>

<style scoped>
.calculator {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  font-size: 20px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.button {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.operator {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.equal {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
