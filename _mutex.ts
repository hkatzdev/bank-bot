// Adapted from https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
// For Hackathon purposes this is basically a library
class Mutex {
  #lock = Promise.resolve();

  lock(): PromiseLike<() => void> {
    let begin: (unlock: () => void) => void = (unlock) => {};

    this.lock = this.lock.then(() => {
      return new Promise(begin);
    });

    return new Promise((res) => {
      begin = res;
    });
  }
}

const map: Record<string, Mutex> = {};

const safeUserCheck = async (users: string[], resolve) => {
  const allMutex = [];
  for (const user of users) {
    let mutex = map.user;
    if (!mutex) mutex = map.user = new Mutex();
    await mutex.lock();
  }
};
