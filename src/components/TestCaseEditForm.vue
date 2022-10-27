<script>
import jsonModel from '/src/components/model.json';
import TestCaseInputOutputItem from '/src/components/TestCaseInputOutputItem.vue';

const getInputIdsFromDecision = (decision) => {
  return decision.inputs.map((item) => item.id);
};

const getOutputIdsFromDecision = (decision) => {
  return decision.outputs.map((item) => item.id);
};

const sanitizeTestCaseValues = (testCase) => {
  if (testCase.decisionId !== 'all') {
    const selectedDecision = jsonModel.decisions.find(
      (item) => item.decision_id == testCase.decisionId
    );
    if (selectedDecision) {
      // sanitize input values
      const inputKeys = getInputIdsFromDecision(selectedDecision);
      testCase.inputValues = Object.fromEntries(
        inputKeys.map((key) => [key, testCase.inputValues[key]])
      );
      // sanitize expected values
      const outputKeys = getOutputIdsFromDecision(selectedDecision);
      testCase.expectedValues = Object.fromEntries(
        outputKeys.map((key) => [key, testCase.expectedValues[key]])
      );
    }
  }
};

export default {
  props: {
    testCase: {
      type: Object,
      required: true,
    },
  },
  components: {
    TestCaseInputOutputItem,
  },
  data() {
    return {
      myJson1: jsonModel,
    };
  },
  computed: {
    allDecisions() {
      return this.myJson1.decisions;
    },
    filteredDecisions() {
      if (this.testCase.decisionId == 'all') {
        return this.myJson1.decisions;
      } else {
        return this.myJson1.decisions.filter(
          (item) => item.decision_id == this.testCase.decisionId
        );
      }
    },
  },
  methods: {
    refreshValuesObject() {
      sanitizeTestCaseValues(this.testCase);
    },
  },
};
</script>

<template>
  <h2>Decision: {{ testCase.decisionId }}</h2>
  <select v-model="testCase.decisionId">
    <option value="all">All</option>
    <option v-for="decision in allDecisions" :value="decision.decision_id">
      {{ decision.name }}
    </option>
  </select>

  <h3>Inputs</h3>
  <template v-for="decision in filteredDecisions">
    <h4>{{ decision.name }}</h4>
    <TestCaseInputOutputItem
      v-for="input in decision.inputs"
      :input-output="input"
      :test-case="testCase"
      :key="input.id"
    />
  </template>

  <h3>Outputs</h3>
  <template v-for="decision in filteredDecisions">
    <h4>{{ decision.name }}</h4>
    <TestCaseInputOutputItem
      v-for="output in decision.outputs"
      type="output"
      :input-output="output"
      :test-case="testCase"
      :key="output.id"
    />
  </template>

  <button @click="refreshValuesObject">Sanitize TestCase Values</button>

  <h3>Debug TestCase Input Values</h3>
  {{ testCase.inputValues }}

  <h3>Debug TestCase Expected Values</h3>
  {{ testCase.expectedValues }}
</template>
