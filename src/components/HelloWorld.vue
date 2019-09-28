<template>
  <div class="hello">
    <div>{{ message }}</div>
    <div>{{ msgRev }}</div>
    <input v-model="message"></input>
    <div v-on:click="reverseMsg">Reverse</div>
  </div>
</template>

<script>
 export default {
     name: 'HelloWorld',
     props: {
	 msg: String
     },
     data () {
	 return {
	     message: 'hello blya'
	 }
     },
     methods: {
	 reverseMsg () {
	     this.message = this.message.split('').reverse().join('');
	 }
     },
     computed: {
	 msgRev () {
	     return this.message.split('').reverse().join('');
	 }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
