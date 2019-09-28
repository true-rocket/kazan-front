<template>
  <div style="display: flex; align-items: center">
    <div @click="value = value ? false : true; 
		 $emit('input', value)"
	 v-bind:class="[value ? 'checked': 'default']"></div>
    <slot></slot>
  </div>
</template>

<script>
 export default {
     name: 'nice-checkbox',
     props: ['value']
 }
</script>

<style>
 .checked {
     background-repeat: no-repeat;
     background-position: center;
     background-image: url("../assets/box-checked.svg");
     width: 24px;
     height: 24px;
     margin-bottom: 4px;
     margin-right: 10px;
 }
 
 .default {
     margin: 3px;
     margin-right: 13px;
     margin-bottom: 7px;
     width: 14px;
     height: 14px;
     border: 2px solid #2C42C8;
     border-radius: 2px
 }
</style>
