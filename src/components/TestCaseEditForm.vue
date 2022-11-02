<script>
import { mapActions } from 'vuex'
import jsonModel from '/src/components/model.json';
import TestCaseInputOutputItem from '/src/components/TestCaseInputOutputItem.vue';

const getDecisionsByTestCase = (testCase, model) => {
  if (testCase.decisionId == 'all') {
    return model.decisions;
  } else {
    return model.decisions.filter(
      (item) => item.decision_id == testCase.decisionId
    );
  }
};

const getInputNamesFromDecision = (decision, excludeBinded) => {
  return decision.inputs.reduce((acc, cur) => {
    if (!(excludeBinded && cur.binded)) {
      acc.push(cur.name)
    }
    return acc
  }, [])
};

const getOutputNamesFromDecision = (decision, excludeBinded) => {
  return decision.outputs.reduce((acc, cur) => {
    if (!(excludeBinded && cur.binded)) {
      acc.push(cur.name)
    }
    return acc
  }, [])
};

const sanitizeTestCaseValues = (testCase) => {
  const decisions = getDecisionsByTestCase(testCase, jsonModel);

  // obtain all input / outpus keys related to decisions
  const keys = decisions.reduce(
    (acc, cur) => {
      return {
        input: [...acc.input, ...getInputNamesFromDecision(cur, testCase.decisionId === 'all')],
        output: [...acc.output, ...getOutputNamesFromDecision(cur, testCase.decisionId === 'all')],
      };
    },
    { input: [], output: [] }
  );

  // sanitize input values
  testCase.inputValues = Object.fromEntries(
    keys.input.map((key) => [key, testCase.inputValues[key] ?? ''])
  );

  // sanitize expected values
  testCase.expectedValues = Object.fromEntries(
    keys.output.map((key) => [key, testCase.expectedValues[key] ?? ''])
  );
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
      return getDecisionsByTestCase(this.testCase, this.myJson1);
    },
  },
  methods: {
    ...mapActions('testCases', ['evaluateTestCase']),
    refreshValuesObject() {
      sanitizeTestCaseValues(this.testCase);
    },
  },
};
</script>

<template>
  <h2>{{ testCase.name }}</h2>
  <button @click="evaluateTestCase(testCase)">Evaluar</button>

  <h2>Decision: {{ testCase.decisionId }}</h2>
  <select v-model="testCase.decisionId">
    <option value="all">All</option>
    <option v-for="decision in allDecisions" :value="decision.decision_id">
      {{ decision.name }}
    </option>
  </select>

  <h3>Inputs</h3>
  <template v-for="decision in filteredDecisions">
    <h4 v-if="testCase.decisionId == 'all'">{{ decision.name }}</h4>
    <TestCaseInputOutputItem
      v-for="input in decision.inputs"
      :input-output="input"
      :test-case="testCase"
      :key="input.id"
    />
  </template>

  <h3>Outputs</h3>
  <template v-for="decision in filteredDecisions">
    <h4 v-if="testCase.decisionId == 'all'">{{ decision.name }}</h4>
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

  <h3>Debug TestCase Output Values</h3>
  {{ testCase.outputValues }}
</template>
