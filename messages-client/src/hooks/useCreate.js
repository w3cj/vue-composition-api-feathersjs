import { ref } from '@vue/composition-api';

import client from '../client';

export default function useCreate(serviceName) {
  const loading = ref(false);
  const error = ref('');
  const item = ref(null);

  const service = client.service(serviceName);

  const create = async (payload) => {
    try {
      loading.value = true;
      const created = await service.create(payload);
      item.value = created;
    } catch (err) {
      error.value = err.message;
    }
    loading.value = false;
  };

  return {
    loading,
    error,
    item,
    create,
  };
}
