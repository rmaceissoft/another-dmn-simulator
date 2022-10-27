<script>
// Intended to map a decision input/output type to HTML Input Type
// HTML Input Types:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
const MAPPING_INPUT_TYPES = {
  integer: 'number',
  string: 'text',
};

export default {
  props: {
    inputOutput: {
      type: Object,
      required: true,
    },
    testCase: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'input',
      validator: (value) => {
        return ['input', 'output'].includes(value);
      },
    },
  },
  computed: {
    htmlInputType() {
      return (
        MAPPING_INPUT_TYPES[this.inputOutput.type] ?? this.inputOutput.type
      );
    },
    objectWithValues() {
      return this.type === 'input'
        ? this.testCase.inputValues
        : this.testCase.expectedValues;
    },
    inputOutputValue: {
      get: function () {
        return this.objectWithValues[this.inputOutput.input_id];
      },
      set: function (newValue) {
        this.objectWithValues[this.inputOutput.input_id] = newValue;
      },
    },
  },
};
</script>

<template>
  <label :for="inputOutput.input_id">
    <span>{{ inputOutput.label }}</span>
    <input
      :type="htmlInputType"
      :name="inputOutput.name"
      :id="inputOutput.input_id"
      v-model="inputOutputValue"
    />
    <br />
  </label>
</template>

<style scoped>
label > span {
  display: block;
}
</style>
