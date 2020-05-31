class Mutex {
  #lock = Promise.resolve();

  safeCall<T>(call: PromiseLike<T>): Promise<T> {
    this.#lock = this.#lock.then(call);
    return this.#lock;
  }

  async lock(): Promise<() => unknown> {
    let resolve: () => unknown;
    const lock = await new Promise(res => resolve = res);
    this.#lock = this.#lock.then(lock);
    return resolve;
  }

  release(): void {

  }
}

const map: Record<string, Mutex> = {};

const safeCall = async <T>(users: string[], call: PromiseLike<T>): Promise<T> {
  const allMutex = [];
  for (const user of users) {
    let mutex = map.user;
    if (!mutex) mutex = map.user = new Mutex();
  }
}