<template>
  <div style="display: flex">
    <ScenarioNode v-for="(node, key) in nodes"
		  :key="key + 1"
		  :index="key"
		  :nodeName="node.name"
		  :nodeDeclineAction="node.declineAction"
		  :nodeChildren="node.children"></ScenarioNode>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import NiceInput from './NiceInput.vue';
 import NiceCheckbox from './NiceCheckbox.vue';
 import NiceDraggableList from './NiceDraggableList.vue';
 import ScenarioNode from './ScenarioNodeRender.vue'
 
 let newEmptyNode = () => ({name: "Новая инстанция",
			    declineAction: 'Пауза',
			    children: []});
 
 export default {
     components: {
	 draggable,
	 NiceInput,
	 NiceCheckbox,
	 NiceDraggableList,
	 ScenarioNode
     },
     name: 'ScenarioConstructor',
     data () {
	 return {
	     nodes: []
	 }
     },
     beforeMount: function () {
	 this.nodes.push(newEmptyNode());
	 this.nodes.push(newEmptyNode());
	 this.nodes.push(newEmptyNode());
	 this.nodes.push(newEmptyNode());
	 this.nodes[1].children.push(newEmptyNode());
	 this.nodes[1].children.push(newEmptyNode());
	 this.nodes[1].children[0].children.push(newEmptyNode());
     },
     methods: {

     }
 }
</script>

<style lang="scss">
 .main-container {
     display: flex;
 }
 
 
 
 .node-container {
     display: flex;
     .node {
	 min-width: 200px;
     }
     .node-children-container {
	 .node-children {
	     
	 }
     }
 }
</style>
