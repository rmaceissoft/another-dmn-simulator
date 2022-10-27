<script>
import jsonModel from '/src/components/model.json';
import TestCaseInputOutputItem from '/src/components/TestCaseInputOutputItem.vue';

export default {
  props: ['testCase'],
  components: {
    TestCaseInputOutputItem,
  },
  data() {
    return {
      myJson1: jsonModel,
    };
  },
  computed: {
    decisions() {
      if (this.testCase.decisionId == 'all') {
        return this.myJson1.decisions;
      } else {
        return this.myJson1.decisions.filter(
          (item) => item.decision_id == this.testCase.decisionId
        );
      }
    },
  },
};
</script>

<template>
  <h2>Decision: {{ testCase.decisionId }}</h2>

  <template v-for="decision in decisions">
    <TestCaseInputOutputItem
      v-for="input in decision.inputs"
      :input-output="input"
      :test-case="testCase"
      :key="input.id"
    />
    <TestCaseInputOutputItem
      v-for="output in decision.outputs"
      type="output"
      :input-output="output"
      :test-case="testCase"
      :key="output.id"
    />
  </template>

  <h3>Debug TestCase Input Values</h3>
  {{ testCase.inputValues }}

  <h3>Debug TestCase Expected Values</h3>
  {{ testCase.expectedValues }}
</template>
