<template>
  <div class="FormStep_tiles">
    <div v-on:click="selectStep(index)"
	 v-bind:class="[selectedSteps.includes(index) ? 'FormStep_selected' : 'FormStep_default', 'FormStep']"
	 v-for="(step, index) in steps">
      <h1>Шаг {{index}}</h1></div>
    <div v-on:click="addNewEmptyStep"
	 class="FormStep_add FormStep"></div>
    <div v-if="selectedSteps.length"
	 v-on:click="deleteSteps"
	 class="deleteButton">Delete</div>
  </div>
</template>

<script>
 const newEmptyStep = "empty";

 
 export default {
     name: 'FormConstructor',
     data () {
	 return {
	     steps: [],
	     selectedSteps: []
	 }
     },
     beforeMount: function () {
	 this.steps.push(newEmptyStep);
     },
     methods: {
	 deleteSteps () {
	     this.selectedSteps = this.selectedSteps.sort((a, b) => a < b ? 1 : -1);
	     this.selectedSteps.map(val => {
		 this.steps.splice(val, 1);
	     });
	     this.selectedSteps = [];
	 },
	 addNewEmptyStep () {
	     this.steps.push(newEmptyStep + ' ' + this.steps.length);
	 },
	 selectStep(index) {
	     if(this.selectedSteps.includes(index)) {
		 this.selectedSteps.splice(this.selectedSteps.indexOf(index), 1)
	     } else {
		 this.selectedSteps.push(index);
	     }
	 }
     }
 }
</script>

<style>
 
 /*  */
 .FormConstructor {
     display: flex;
     flex-direction: row;
 }   
 
 .FormStep_selected {
     background-color: #2C42C8;
     border: none;
     box-shadow: 0px 2px 10px #677DCB;
     color: #FFFFFF;
 }
 
 .FormStep_tiles {
     padding-left: 90px;
     background-color: #F7F8FD;
     display: flex;
     flex-direction: row;
 }
 
 /* big plus button */
 
 .FormStep {
     margin: 17px;
     width: 124px;
     height: 88px;
     border-radius: 4px;
     h1 {
	 font-size: 22px;
     }
     p {
	 
     }
     input {

     }
 }
 
 .FormStep_default {
     background-color: #ECEDF6;
     color: #ADB3D5;
 }
 
 .FormStep_add {
     border: 1px dotted #6892CC;
     background-color: #F8FCFE;
     background-repeat: no-repeat;
     background-position: center;
     background-image: url("../assets/big-plus.svg");
 }
 
 /* step container */
 
</style>
