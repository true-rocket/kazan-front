<template>
  <div>
    <span>Название поля</span><input v-model="name" placeholder="Название поля"/>
    <span>Тип данных</span><select v-model="valueType">
      <option value="text">Текст</option>
      <option value="number">Число</option>
      <option value="date">Дата</option>
    </select>
  </div>
</template>

<script>
 export default {
     name: 'form-field-constructor',
     // value types : text, number, date
     data() {
	 return {
	     name: "",
	     valueType: ""
	 }
     }
 }
</script>
