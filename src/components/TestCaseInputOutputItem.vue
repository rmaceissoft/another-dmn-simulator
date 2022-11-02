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
        return ['input', 'output', 'expected'].includes(value);
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
      const FIELDS_MAPPING = {
        'input': 'inputValues',
        'output': 'outputValues',
        'expected': 'expectedValues'
      }
      return this.testCase[FIELDS_MAPPING[this.type]]
    },
    inputOutputValue: {
      get: function () {
        return this.objectWithValues[this.inputOutput.name];
      },
      set: function (newValue) {
        this.objectWithValues[this.inputOutput.name] = newValue;
      },
    },
    // determine if the input / output should be rendered
    isHidden() {
      // an input / ouput shouldnt be rendered when the following conditions are satisfied
      // 1. the decision of the test case is set to all
      // 2. it's of type input
      // 3. the input is binded
      return this.testCase.decisionId === 'all' && ['input', 'expected'].includes(this.type) && this.inputOutput.binded
    },
    // determine is the input / output should be readonly
    isReadOnly() {
      return this.type === 'output'
    }
  },
};
</script>

<template>
  <label :for="inputOutput.id" v-if="!isHidden">
    <span>{{ inputOutput.label }}</span>
    <input
      :type="htmlInputType"
      :name="inputOutput.name"
      :id="inputOutput.id"
      v-model="inputOutputValue"
      :readonly="isReadOnly"
    />
    <br />
  </label>
</template>

<style scoped>
label > span {
  display: block;
}
</style>
