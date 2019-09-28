<template>
  <div>
    <div style="display: flex; align-items: base-line; margin: 64px; margin-left: 100px; justify-content: space-between">
      <div style="display: flex">
      <div class="pencil"></div>
      <nice-input class="FormHeader"
		  style="margin-left: 20px"
		  v-model="formHeader"></nice-input>
      </div>
      <div @click="saveForm"
	  style="display: flex; align-items: center">
	<div>Сохранить форму&nbsp;</div>
	<div class="saveIcon"></div>
      </div>
    </div>
    <!-- tile steps container -->
    <div class="FormStep_tiles_container">
      <div  class="FormStep_tiles">
	<div style="display: flex">
	  <draggable  v-model="steps"
		      @start="drag=true"
		      @end="drag=false"
		      style="display: flex">
	    <div v-for="(step, index) in steps"
		 :key="index">
	      <div @click.shift="selectStep(index)"
		   @click="toggleStep(index)"
		   v-bind:class="[selectedSteps.includes(index) ? 'FormStep_selected' : 'FormStep_default', 'FormStep']">
		<h1 class="FormStep_header">Шаг {{index}}</h1>
	      </div>
	      <div v-bind:class="[selectedSteps.includes(index) ? 'subHeader_active' : '', 'subHeader']">{{step.name}}</div>
	    </div>
	    
	  </draggable>
	  <div v-on:click="addNewEmptyStep"
	       class="FormStep_add FormStep"></div>
	</div>
	<div v-if="selectedSteps.length"
	     @click="deleteSteps"
	     slot="footer"
	     class="deleteButton">Delete</div>
      </div>
    </div>
    <!-- /tile steps container -->
    <div>
      <div style="display: flex; align-items: base-line; margin-left: 100px; margin-top: 16px;
		  ">
	<div class="pencil"></div>
	<nice-input placeholder="Новый шаг"
		    style="margin-left: 20px;
				 text-align: left;
				 font-size: 34px;
				 color: #2C2C2C;"
		    v-model="steps[currentStep].name">
	</nice-input>
      </div>
      <div v-for="(field, fieldIndex) in steps[currentStep].fields"
      	   @click="activeFieldEditor.index = fieldIndex"
	   style="display: flex; align-items: flex-start">
	<div class="StepField_grey_card"
	     style="width: 50%;
		    padding-bottom: 50px;
		    min-height: 14em">
	  <nice-input style="background: transparent;
			     font-size: 18px"
		      placeholder="Название поля"></nice-input>
	  <br/>
	  <textarea style="margin-top: 15px;
			   height: 80px;
			   background: transparent;
			   font-size: 18px"
		    placeholder="Описание"></textarea>
	  <br/>
	  <div v-if="activeFieldEditor.editPlaceholder && activeFieldEditor.index == fieldIndex">
	    <span>Плейсхолдер поля: </span>
	    <nice-input v-model="field.placeholder"
				 style="padding-top: 15px;
				 background: transparent;
				 font-size: 18px"
				 placeholder="Плейсхолдер"></nice-input>
	  </div>
	  <div v-if="activeFieldEditor.editTooltip && activeFieldEditor.index == fieldIndex">
	    <span>Подсказка при наведении курсора: </span>
	    <nice-input v-model="field.tooltip"
			style="padding-top: 15px;
				 background: transparent;
				 font-size: 18px"
			placeholder="Подсказка"></nice-input>
	  </div>
	  <nice-checkbox checked="field.necessary"
			 style="padding: 15px;
				  position: absolute;
				  bottom: 0"
			 v-model="field.necessary">Это обязательное поле</nice-checkbox>
	  <div style="position: absolute; bottom: 0; right: 0; display: flex; align-items: center"
	       v-if="fieldIndex == activeFieldEditor.index">
	    <div @click="activeFieldEditor.editPlaceholder = activeFieldEditor.editPlaceholder ? false : true; activeFieldEditor.editTooltip = false"
		 class="StepField_placeholder img"></div>
	    <div @click="activeFieldEditor.editPlaceholder = false; activeFieldEditor.editTooltip = activeFieldEditor.editTooltip ? false : true"
		 class="StepField_tooltip img"></div>
	    <div style="display: flex; align-items: center"
		 class="StepField_delete"
		 @click="steps[currentStep].fields.splice(fieldIndex, 1)">
	      <div class="StepField_delete_icon"
		   style="margin: 7px"></div>
	      Удалить поле</div>
	  </div>
	</div>
	<div v-if="fieldIndex == activeFieldEditor.index"
	     class="StepField_grey_card StepField_userActions">
	  <h1>Что пользователь должен<br/>здесь сделать?</h1>
	  <div class="StepField_textInput img"></div>
	  <div @click="editorActivateInput(1, field)">Ввести данные</div>
	  <div class="StepField_fileInput img"></div>
	  <div @click="editorActivateInput(2, field)">Прикрепить файл</div>
	  <div class="StepField_radioInput img"></div>
	  <div @click="editorActivateInput(3, field)">Выбрать одно</div>
	  <div class="StepField_multipleInput img"></div>
	  <div @click="editorActivateInput(4, field)">Выбрать несколько</div>
	</div>
	<div v-if="activeFieldEditor.activeInput && fieldIndex == activeFieldEditor.index"
	     class="StepField_grey_card StepField_input">
	  <div v-if="activeFieldEditor.activeInput == 1 && !field.value">
	    <nice-input style="background: transparent;
			       font-size: 18px;
			       padding: 13px;
			       padding-bottom: 8px;
			       border-bottom: 2px solid #9CAADC;
			       color: #9BAAE4;"
			       placeholder="Поиск"></nice-input>
	    <div class="StepField_listItem"
		 style="padding: 10px; color: #595A63"
		 @click="field.value = value; field.valueType = 'text'"
		 v-for="value in fieldTypes">{{value}}</div>
	  </div>
	  <div class="StepField_listItem"
	       style="font-size: 18px;
		      padding: 13px;
		      display: flex;
		      padding-bottom: 8px;"
	       v-if="activeFieldEditor.activeInput == 1 && field.value">
	    <div>
	      {{field.value}}
	    </div>
	    <div @click="field.value = undefined; field.valueType = undefined">&nbsp;✕</div>
	  </div>
	</div>
	<div v-if="activeFieldEditor.activeInput && fieldIndex == activeFieldEditor.index"
	     class="StepField_grey_card StepField_input">
	  <div v-if="activeFieldEditor.activeInput == 2">
	    <div v-if="field.value == 'pdf' || !field.value"
		 class="StepField_listItem"
		 style="display: flex; align-items: center">
	      <div style="padding: 10px; color: #595A63; padding-left: 38px; position: relative;"
		   @click="field.value = 'pdf'; field.valueType = 'field'">
		<div class="iconSheet img"></div>
		PDF
	      </div>
	      <span @click="field.value = undefined; field.valueType = undefined"
		    v-if="field.value">&nbsp;✕&nbsp;&nbsp;</span>
	    </div>
	    <div v-if="field.value == 'doc' || !field.value"
		 class="StepField_listItem"
		 style="display: flex; align-items: center">
	      <div style="padding: 10px; color: #595A63; padding-left: 38px; position: relative;"
		   @click="field.value = 'doc'; field.valueType = 'field'">
		<div class="iconSheet img"></div>
		DOC
	      </div>
	      <span @click="field.value = undefined; field.valueType = undefined"
		    v-if="field.value">&nbsp;✕&nbsp;&nbsp;</span>
	    </div>
	    <div v-if="field.value == 'jpeg' || !field.value"
		 class="StepField_listItem"
		 style="display: flex; align-items: center">
	      <div style="padding: 10px; color: #595A63; padding-left: 38px; position: relative;"
		   @click="field.value = 'jpeg'; field.valueType = 'field'">
		<div class="iconPic img"></div>
		JPEG
	      </div>
	      <span @click="field.value = undefined; field.valueType = undefined"
		    v-if="field.value">&nbsp;✕&nbsp;&nbsp;</span>
	    </div>
	  </div>
	  <div v-if="activeFieldEditor.activeInput == 3">
	    <nice-draggable-list v-model="field.value"></nice-draggable-list>
	  </div>
	  <div v-if="activeFieldEditor.activeInput == 4">
	    <nice-draggable-list v-model="field.value"></nice-draggable-list>
	  </div>
	</div>
      </div>
    </div>
    <div class="StepField_new"
	 @click="newField">+ Новое поле</div>
  </div>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import NiceInput from './NiceInput.vue';
 import NiceCheckbox from './NiceCheckbox.vue';
 import NiceDraggableList from './NiceDraggableList.vue';
 
 let newEmptyStep = () => ({name: "Новый шаг",
			    fields: []});
 

 
 export default {
     components: {
	 draggable,
	 NiceInput,
	 NiceDraggableList,
	 NiceCheckbox
     },
     name: 'FormConstructor',
     data () {
	 return {
	     steps: [],
	     selectedSteps: [0],
	     currentStep: 0,
	     actionSelect: false,
	     drag: false,
	     formHeader: 'Новая форма',
	     fieldTypes: [
		 'ФИО',
		 'Число',
		 'Месяц',
		 'Год',
		 'Пол',
		 'Страна',
		 'Республика/Край/Область',
		 'Населенный пункт'
	     ],
	     activeFieldEditor: {
		 editPlaceholder: false,
		 editTooltip: false,
		 activeInput: undefined,
		 index: 0
	     }
	 }
     },
     beforeMount: function () {
	 this.steps.push(newEmptyStep());
     },
     methods: {
	 saveForm() {
	 },
	 editorActivateInput(num, field) {
	     let ed = this.activeFieldEditor;
	     ed.activeInput = num;
	     let valueType;
	     if(num == 1) {
		 valueType = 'text'
	     }
	     else if(num == 2) {
		 valueType = 'file'
	     }
	     else if(num == 3) {
		 valueType = 'radio'
	     }
	     else if(num == 4) {
		 valueType = 'multiple'
	     }
	     if(field.valueType == valueType)
		 return
	     field.valueType = valueType
	     field.value = undefined
	 },
	 newField() {
	     var fieldItem;
	     fieldItem = {necessary: false,
			  valueType: undefined,
			  value: undefined};
	     
	     this.steps[this.currentStep].fields.push(fieldItem);
	     this.activeFieldEditor.index = this.steps[this.currentStep].fields.length - 1
	 },
	 deleteSteps () {
	     this.selectedSteps = this.selectedSteps.sort((a, b) => a < b ? 1 : -1);
	     this.selectedSteps.map(val => {
		 this.steps.splice(val, 1);
	     });
	     this.currentStep = this.steps.length - 1;
	     this.selectedSteps = [this.currentStep];
	 },
	 addNewEmptyStep () {
	     this.toggleStep(this.steps.length);
	     this.steps.push(newEmptyStep());
	 },
	 selectStep(index) {
	     this.actionSelect = true;
	     console.log('select');
	     if(this.selectedSteps.includes(index)) {
		 this.selectedSteps.splice(this.selectedSteps.indexOf(index), 1)
	     } else {
		 this.selectedSteps.push(index);
	     }
	 },
	 toggleStep(index) {
	     if(!this.actionSelect) {
		 this.currentStep = index;
		 this.selectedSteps = [index];
	     }
	     this.actionSelect = false;
	 }
     }
 }
</script>

<style lang="scss">
 
 
 
 /*  */
 .FormHeader {
     position: relative;
     text-align: left;
     font-size: 34px;
     color: #2C2C2C;
 }
 
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
 
 .StepField {
     width: 50%;
     background: #FAFAFA;
     border-radius: 4px;
     margin: 31px;
     padding: 19px 20px 7px 29px;
 }
 
 
 
 .StepField_new {
     width: fit-content;
     margin: 47px;
     padding: 20px;
     color: #8A3BEE;
     border: 2px solid #8A3BEE;
     border-radius: 4px;
 }
 
 .StepField_grey_card {
     padding: 15px;
     position: relative;
     width: fit-content;
     margin: 25px;
     text-align: left;
     background: #FAFAFA;
     border-radius: 4px;
     h1 {
	 color: #595A63;
	 text-align: left;
	 font-size: 18px;
     }
 }
 
 .iconSheet {
     width: 25px;
     height: 25px;
     background-image: url("../assets/ion-document-outline.svg");
     position: absolute;
     left: 8px;
     bottom: 8px;
 }
 
 .iconPic {
     width: 25px;
     height: 25px;
     background-image: url("../assets/ant-design_picture-outline.svg");
     position: absolute;
     left: 8px;
     bottom: 8px;
 }
 
 
 .StepField_listItem {
     cursor: pointer;
     &:hover {
	 background-color: #EBEDF5;
     }
 }
 
 .StepField_input {
     margin-left: -10px;
     padding: 0;
     background-color: #F6F8FF;
     border-radius: 4px;
 }
 
 .img {
     background-repeat: no-repeat;
     background-position: center;
 }
 
 .StepField {
     background-repeat: no-repeat;
     background-position: center;     
     
     &_textInput {
	 background-image: url("../assets/short-text.svg");
	 width: 24px;
	 height: 24px;     
     }
     
     &_fileInput {
	 background-image: url("../assets/paper-clip-icon.svg");
	 width: 24px;
	 height: 24px;
     }
     
     &_radioInput {
	 background-image: url("../assets/radio-icon.svg");
	 width: 24px;
	 height: 24px;
     }
     
     &_multipleInput {
	 background-image: url("../assets/checkbox-icon.svg");
	 width: 24px;
	 height: 24px;
     }
     &_tooltip {
	 margin: 7px;
	 background-image: url("../assets/ant-design_question-circle-outline.svg");
	 width: 28px;
	 height: 28px;
     }
     
     &_placeholder {
	 margin: 7px;
	 background-image: url("../assets/mdi-textbox-password.svg");
	 width: 28px;
	 height: 28px;
     }
 }
 
 .StepField_delete {
     padding: 13px;
     background-color: #F5F5F5;
     color: #C4C4C4;
     &_icon {
	 background-image: url("../assets/feather-delete.svg");
	 width: 24px;
	 height: 24px;
     }
 }
 
 .StepField_userActions {
     h1 {
	 grid-column: 1/3;
	 grid-row: 1;
     }
     padding: 16px;
     white-space: nowrap;
     text-align: left;
     grid-row-gap: 7px;
     display: grid;
     grid-template-columns: 20% 80%;
     grid-template-rows: auto auto auto auto auto;
     font-size: 18px;
     color: #848484;
 }
 
 .subHeader {
     width: 124px;
     margin-left: auto;
     margin-right: auto;
     margin-top: 5px;
     padding-top: 6px;
     text-align: left;
     font-family: PT Root UI;
     font-size: 16px;
     line-height: 20px;
     color: #ADB3D5;
     border-top: 2px solid #ADB3D5;
     &_active {
	 color: #2C2C2C;
	 border-top: 2px solid #2C42C8;
     }
 }
 .FormStep_tiles_container {
     position: relative;
     max-width: 100%;
     overflow-x: scroll;
     background-color: #F7F8FD;
     padding-left: 90px;
     padding-right: 90px;
 }
 .FormStep_tiles {
     position: relative;
     display: flex;
     flex-direction: row;
 }
 
 
 
 /* big plus button */
 
 .FormStep {
     position: relative;
     margin: 17px;
     width: 124px;
     height: 88px;
     border-radius: 4px;
     &_header {
	 margin: 0;
	 position: absolute;
	 bottom: 14px;
	 font-size: 22px;
	 width: 80%;
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
 
 .saveIcon {
     background-image: url("../assets/entypo-save.svg");
     width: 28px;
     height: 28px;
 }
 
 .FormStep_add {
     content: "";
     width: 124px;
     border: 1px dotted #6892CC;
     background-color: #F8FCFE;
     background-repeat: no-repeat;
     background-position: center;
     background-image: url("../assets/big-plus.svg");
 }
 
 .pencil {
     position: relative;
     width: 28px;
     height: 28px;
     content: "";
     background-repeat: no-repeat;
     background-position: center;
     background-image: url("../assets/pencil.svg");
 }
 
 /* step container */
 
</style>
