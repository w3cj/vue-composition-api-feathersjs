<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Messages!</a>
    </nav>
    <main class="container mt-3">
      <button @click="showForm = !showForm" type="button" class="btn btn-primary">Toggle Form</button>
      <form v-if="showForm" class="m-2" @submit.prevent="formSubmitted()">
        <div v-if="createError" class="alert alert-danger">{{createError}}</div>
        <fieldset>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
              v-model="message.name"
            />
          </div>
          <div class="form-group">
            <label for="text">Caption</label>
            <textarea v-model="message.text" class="form-control" id="text" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="url">Image URL</label>
            <input
              type="url"
              class="form-control"
              id="url"
              placeholder="Enter a url"
              v-model="message.image"
            />
          </div>
        </fieldset>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
      <div class="row">
        <div v-for="item in items.data" :key="item._id" class="col-4 p-3">
          <div class="card mb-3">
            <h3 class="card-header">{{item.name}}</h3>
            <div class="card-body">
              <h5 class="card-title">{{item.text}}</h5>
              <small>{{new Date(item.createdAt).toLocaleString()}}</small>
            </div>
            <img style="width: 100%; display: block;" :src="item.image" :alt="item.text" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api';
import useService from './hooks/useService';
import useCreate from './hooks/useCreate';

const createEmptyMessage = () => ({
  name: '',
  text: '',
  image: '',
});

export default {
  setup() {
    const showForm = ref(false);

    const message = reactive(createEmptyMessage());

    const { loading, error, items } = useService('messages', {
      query: {
        $sort: {
          createdAt: -1,
        },
      },
    });

    const {
      loading: createLoading,
      error: createError,
      create,
    } = useCreate('messages');

    async function formSubmitted() {
      await create(message);
      if (!createError.value) {
        showForm.value = false;
        Object.assign(message, createEmptyMessage());
      }
    }

    return {
      formSubmitted,
      createLoading,
      createError,
      message,
      showForm,
      loading,
      error,
      items,
    };
  },
};
</script>

<style>
</style>
