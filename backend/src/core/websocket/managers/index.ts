export class BaseManager<K, V> extends Map<K, V> {
  public find(fn: (value: V, key: K, manager: this) => boolean): V | undefined {
    for (const [key, value] of this) {
      if (fn(value, key, this)) {
        return value;
      }
    }
    return undefined;
  }

  public findKey(fn: (value: V, key: K, manager: this) => boolean): K | undefined {
    for (const [key, value] of this) {
      if (fn(value, key, this)) {
        return key;
      }
    }
    return undefined;
  }

  public filter(fn: (value: V, key: K, manager: this) => boolean): BaseManager<K, V> {
    const result: BaseManager<K, V> = new BaseManager<K, V>();
    for (const [key, value] of this) {
      if (fn(value, key, this)) {
        result.set(key, value);
      }
    }
    return result;
  }

  public map<T>(fn: (value: V, key: K, manager: this) => T): T[] {
    const iter = this.entries();
    return Array.from({ length: this.size }, (): T => {
      const [key, value] = iter.next().value;
      return fn(value, key, this);
    });
  }

  public some(fn: (value: V, key: K, manager: this) => boolean): boolean {
    for (const [key, value] of this) {
      if (fn(value, key, this)) {
        return true;
      }
    }
    return false;
  }
}
