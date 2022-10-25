<script>
import jsonModel from '/src/components/model.json';
import TestCaseInputOutputItem from '/src/components/TestCaseInputOutputItem.vue';

export default {
  props: ['decisionId'],
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
      if (this.decisionId == 'all') {
        return this.myJson1.decisions;
      } else {
        return this.myJson1.decisions.filter(
          (item) => item.decision_id == this.decisionId
        );
      }
    },
  },
};
</script>

<template>
  <h2>Decision: {{ decisionId }}</h2>

  <template v-for="decision in decisions">
    <TestCaseInputOutputItem
      v-for="input in decision.inputs"
      :input-output="input"
      :key="input.input_id"
    />
  </template>
</template>
