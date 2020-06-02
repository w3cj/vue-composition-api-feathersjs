<template>
  <div id="app">
    <form @submit.prevent="formSubmitted()">
      <label for="newTodo">Todo</label>
      <input v-model="newTodo" id="newTodo" name="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">
        <p>{{item.content}}</p>
        <button @click="removeItem(item.id)">Remove Todo</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

import useItems from './hooks/useItems';

export default {
  name: 'App',
  setup() {
    const newTodo = ref('');
    const { items, addItem, removeItem } = useItems();

    function formSubmitted() {
      if (newTodo.value) {
        addItem({
          done: false,
          content: this.newTodo,
        });
        newTodo.value = '';
      }
    }

    return {
      items,
      newTodo,
      removeItem,
      formSubmitted,
    };
  },
};
</script>

<style>

</style>
