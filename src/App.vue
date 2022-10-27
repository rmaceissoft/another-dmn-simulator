<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TestCaseEditForm from './components/TestCaseEditForm.vue';

export default {
  components: {
    TestCaseEditForm,
  },
  data() {
    return {
      sampleTestCase: {
        decisionId: 'all',
        name: 'Case de Prueba 1',
        inputValues: {
          seasonInput: 'summer',
          guestCountInput: 2,
        },
        expectedValues: {
          output1: 'failed',
        },
      },
    };
  },
};
</script>

<template>
  <TestCaseEditForm :test-case="sampleTestCase" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
