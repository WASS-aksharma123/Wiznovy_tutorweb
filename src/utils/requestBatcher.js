class RequestBatcher {
  constructor() {
    this.batches = new Map();
    this.timeouts = new Map();
  }

  batch(key, request, delay = 50) {
    return new Promise((resolve, reject) => {
      if (!this.batches.has(key)) {
        this.batches.set(key, []);
      }

      this.batches.get(key).push({ resolve, reject, request });

      if (this.timeouts.has(key)) {
        clearTimeout(this.timeouts.get(key));
      }

      const timeout = setTimeout(async () => {
        const batch = this.batches.get(key);
        this.batches.delete(key);
        this.timeouts.delete(key);

        try {
          // Execute all requests in parallel
          const results = await Promise.allSettled(
            batch.map(item => item.request())
          );

          results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
              batch[index].resolve(result.value);
            } else {
              batch[index].reject(result.reason);
            }
          });
        } catch (error) {
          batch.forEach(item => item.reject(error));
        }
      }, delay);

      this.timeouts.set(key, timeout);
    });
  }
}

export const requestBatcher = new RequestBatcher();