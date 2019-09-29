<template>
  <div class="mainGrid">
    <div>Название поля</div>
    <input v-model="nameRu" placeholder="Название поля"/>
    <div>Название поля на английском</div>
    <input v-model="name" placeholder="Название поля"/>
    <div>Тип данных</div>
    <select v-model="valueType">
      <option value="text">Текст</option>
      <option value="number">Число</option>
      <option value="date">Дата</option>
    </select>
    <div>Описание поля</div>
    <textarea v-model="description"></textarea>
    <div @click="saveField"
		 style="display: flex;
		 align-items: center;
		 grid-column: 1/3;">
      <div>Сохранить</div>
      <div class="saveButton"></div>
    </div>
  </div>
</template>

<script>
import bs '@/components/BackService'
 export default {
   name: 'form-field-constructor',
   components: {bs},
   // value types : text, number, date
  data() {
  	return {
  	     name: "",
  	     nameRu: "",
  	     description: "",
  	     valueType: ""
  	}
  },
  methods: {
    saveField() {
      let newField = {
        name: this.name,
        nameRu: this.nameru,
        description: this.description,
        valueType: this.valueType
      }
      this.$bs.createAsync(newField)
    }
  }
 }
</script>

<style>
 .saveButton {
     background-image: url("../assets/entypo-save.svg");
     width: 28px;
     height: 28px;
     margin: 15px;
 }
 .mainGrid {
     display: grid;
     grid-template-columns: 50% 50%;
     grid-template-rows: auto auto auto auto auto;
 }
</style>
