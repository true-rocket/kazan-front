<template>
  <div>
    <draggable v-model="values" @start="drag=true" @end="drag=false; emit()">
      <div v-for="(value, index) in values" :key="index">
	<input style="margin-left: 30px"
	       v-on:keyup.enter="emit"
	       v-on:blur="emit"
	       v-model="value.text"/>
      </div>
    </draggable>
    <input v-on:keyup.enter="checkItem"
	   v-on:blur="checkItem"
	   v-model="newItem.text"/>
  </div>
</template>


<script>
 import draggable from 'vuedraggable';
 
 export default {
     name: 'nice-draggable-list',
     components: {
	 draggable
     },
     props: ['array'],
     model: {
	 prop: 'array',
	 event: 'input'
     },
     data() {
	 return {
	     drag: false,
	     values: this.array,
	     newItem: {text: undefined},
	 }
     },
     methods: {
	 emit() {
	     this.values = this.values.map(val => val.text == "" ? undefined : val);
	     while(this.values.indexOf(undefined) != -1)
		 this.values.splice(this.values.indexOf(undefined), 1);
	     this.$emit('input', this.values);
	 },
	 checkItem() {
	     if(!!this.newItem.text) {
		 if(!this.values)this.values = [];
		 this.values.push({text: this.newItem.text});
		 this.newItem.text = undefined;
		 this.emit();
	     }
	 }
     }
 }
</script>

