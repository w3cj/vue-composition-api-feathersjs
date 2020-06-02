<template>
  <div id="app">
    <form @submit.prevent="formSubmitted()">
      <label for="newTodo">Todo</label>
      <input v-model="newTodo" id="newTodo" name="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.content">{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    newTodo: '',
    items: [{
      done: false,
      content: 'Learn Vue',
    }, {
      done: false,
      content: 'Learn Composition API',
    }, {
      done: false,
      content: 'Learn FeathersJS',
    }],
  }),
  methods: {
    formSubmitted() {
      if (this.newTodo) {
        this.items.push({
          done: false,
          content: this.newTodo,
        });
        this.newTodo = '';
      }
    },
  },
};
</script>

<style>

</style>
