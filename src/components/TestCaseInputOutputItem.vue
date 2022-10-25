<script>
// Intended to map a decision input/output type to HTML Input Type
// HTML Input Types:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
const MAPPING_INPUT_TYPES = {
  integer: 'number',
  string: 'text',
};

export default {
  props: ['inputOutput'],
  computed: {
    htmlInputType() {
      return (
        MAPPING_INPUT_TYPES[this.inputOutput.type] ?? this.inputOutput.type
      );
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
      v-model="inputOutput.value"
    />
    <br />
  </label>
</template>

<style scoped>
label > span {
  display: block;
}
</style>
