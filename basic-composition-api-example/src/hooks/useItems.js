/* eslint-disable no-param-reassign */
import { ref } from '@vue/composition-api';

export default function useItems() {
  const items = ref([]);

  function addItem(item) {
    item.id = `id_${Date.now()}`;
    items.value.push(item);
  }

  function removeItem(id) {
    const foundIndex = items.value.findIndex(item => item.id === id);
    if (foundIndex !== -1) {
      items.value.splice(foundIndex, 1);
    }
  }

  return {
    items,
    addItem,
    removeItem,
  };
}
