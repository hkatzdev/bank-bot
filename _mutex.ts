class Mutex {
  #lock = Promise.resolve();

  async safeCall<T>(lel: PromiseLike<T>): Promise<T> {
    await this.#lock;
    this.#lock = Promise.resolve(lel);
    return T;
  }
  
}