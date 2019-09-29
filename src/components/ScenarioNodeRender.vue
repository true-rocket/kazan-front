<template>
  <div>
    <div v-if="alife"
	 class="node"
	 @click="toggleActions">
      <input v-model="name"/>
      <div>В случае отказа:
	<select v-model="declineAction">
	  {{declineAction}}
	  <option value="Пауза">Пауза</option>
	  <option value="Отказ">Отказ</option>
	</select>
      </div>
      <div v-if="actionsVisible"
	   @click="deleteSelf">
	Delete
      </div>
    </div>
    <!-- 			    v-on:refresh="$forceUpdate()"    -->
    <div class="children-container">
      <scenario-node-render v-if="children.length"
			    v-for="(child, key) in children"
			    v-on:delete="handleDelete"
			    v-on:refresh="$forceUpdate()"
			    :key="key + 1"
			    :index="key"
			    :nodeName="child.name"
			    :nodeDeclineAction="child.declineAction"
			    :nodeChildren="child.children"></scenario-node-render>
    </div>
    <div v-if="!children.length"
	 @click="addStep"
    >+</div>
  </div>
</template>


<script>
 import draggable from 'vuedraggable';
 
 export default {
     name: 'scenario-node-render',
     components: {
	 draggable
     },
     props: ['nodeName', 'nodeChildren', 'nodeDeclineAction', 'index'],
     data() {
	 return {
	     alife: true,
	     declineAction: this.nodeDeclineAction,
	     name: this.nodeName,
	     children: this.nodeChildren,
	     actionsVisible: false
	 }
     },
     methods: {
	 addStep() {
	     this.children.push({name: "Новая инстанция",
				 declineAction: 'Пауза',
				 children: []});
	 },
	 toggleActions() {
	     if(this.actionsVisible)
		 this.actionsVisible = false
	     else
		 this.actionsVisible = true
	 },
	 deleteSelf() {
	     this.alife = false;
	     this.$emit('delete', this.index);
	 },
	 handleDelete(key) {
	     this.children = this.children.concat(this.children[key].children);
	     this.children.splice(key, 1);
	     console.log(this.children);
	 }
     }
 }
</script>

<style>
 .children-container {
     display: flex;
 }
 
 .node {
     padding: 10px;
     margin: 10px;
     border: 1px solid black;
 }
 
</style>

