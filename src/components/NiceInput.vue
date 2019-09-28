<template>
  <input v-bind:value="value"
	 v-bind:placeholder="placeholder"
	 v-on:change="$emit('change', $event.target.value)">
</template>

<script>
 export default {
     name: 'nice-input',
     model: {
	 prop: 'value',
	 event: 'change'
     },
     props: {
	 value: String,
	 placeholder: String
     }
 }
</script>

<style lang="scss">
 input {
     border-style: none;
     &:focus {
	 outline: none;
     }
 }
</style>
