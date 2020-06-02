import { ref, reactive } from '@vue/composition-api';

import client from '../client';

export default function useService(serviceName, options = {}) {
  const loading = ref(false);
  const error = ref('');
  const items = reactive({
    total: 0,
    limit: 10,
    skip: 0,
    data: [],
  });

  const service = client.service(serviceName);
  service.off('created');
  service.on('created', (item) => {
    items.data.unshift(item);
    items.total += 1;
  });

  (async () => {
    try {
      loading.value = true;
      const result = await service.find(options);
      Object.assign(items, result);
    } catch (err) {
      error.value = err.message;
    }
    loading.value = false;
  })();

  return {
    loading,
    error,
    items,
  };
}
