
//@ts-check
export const ls = (() => {
  function get<T>(key: string, _default?: T): T {
    const str = localStorage.getItem(key);
    let value = _default;
    if (str) {
      try { value = JSON.parse(str); }
      catch (e) { console.error(e); }
    }
    // @ts-ignore
    return value;
  }
  const clear = () => localStorage.clear();
  const pop = (key: string) => {
    const value = get(key);
    localStorage.removeItem(key);
    return value;
  }
  const set = (key: string, value) => {
    if (value === undefined) return pop(key);
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
    return value;
  }
  const keys = () => Object.keys(localStorage);
  return { set, get, pop, clear, keys };
})();


export async function sleep(ms) {
  if (ms > 0) await new Promise((resolve) => setTimeout(resolve, ms));
}
export async function until(func: () => any, { ms = 200, timeout = 0 } = {}) {
  if (timeout && ms > timeout) ms = timeout / 10;
  let t0 = (new Date()).getTime();
  let value;
  while (!(value = await func())) {
    if (timeout && (new Date()).getTime() - t0 > timeout)
      throw 'timeout';
    await sleep(ms);
  }
  return value;
}

export const isPromise = (obj) => obj instanceof Promise;
export function isArray(obj): obj is any[] {
  return Array.isArray(obj);
}
export function isString(obj): obj is string {
  return Object.prototype.toString.call(obj) === "[object String]";
}
export const isFragment = (obj) => obj instanceof DocumentFragment;

export function cast<T>(obj: any): T { return obj };
export function asAny(obj: any): any { return obj };
export function asPromise<T>(obj: T | Promise<T>): Promise<T> {
  return asAny(isPromise(obj) ? obj : Promise.resolve(obj));
};
export function asNotNull<T>(value: T): T extends null ? never : T extends undefined ? never : T {
  return asAny(value);
}
export function asNotUndefined<T>(value: T): T extends undefined ? never : T {
  return asAny(value);
}
/** https://github.com/Microsoft/TypeScript/issues/23405#issuecomment-873331031 */
export function assertNotUndefined<T>(value: T, varName?: string): T extends undefined ? never : T {
  if (value === undefined)
    throw new Error(`Unexpected ${value}${(varName ? ` for ${varName}` : "")})}`);
  return asAny(value);
}
export function assertNotNull<T>(value: T): T extends null ? never : T extends undefined ? never : T {
  if (!value && (value === null || value === undefined))
    throw new Error(`Unexpected ${value}`);
  return asAny(value);
}


export const range = (n: number) => [...Array(n).fill(0)].map((x, i) => i);
export const ravel = (arr: any[]) => arr.flat(Infinity);
export const flatten1 = (arr: any[]) => {
  let out: any[] = [];
  for (let x of arr) {
    if (isArray(x)) out.push(...x);
    else out.push(x);
  }
  return out;
}
export function max(arr: number[]) { return Math.max(...arr); }
export function maxNaN(arr: number[]) { return max(arr.filter(x => !isNaN(x))); }
export function min(arr: number[]) { return Math.min(...arr); }
export function minNaN(arr: number[]) { return min(arr.filter(x => !isNaN(x))); }
//@ts-ignore
export function sum(arr: (number | boolean)[]) { let s = 0; for (let x of arr) s += x; return s; }
export function mean(arr: (number | boolean)[]) { return arr.length == 0 ? Number.NaN : sum(arr) / arr.length; }
//@ts-ignore
export function meanNaN(arr: (number | boolean)[]) { return mean(arr.filter(x => !isNaN(x))); }

export function all<T>(arr: T[]): boolean {
  for (let x of arr) if (!x) return false;
  return true;
}
// for "any" use "Array.some"
export function whichAny<T>(arr: T[]): T | null {
  for (let x of arr) if (x) return x;
  return null;
}
export function arrDiff<T>(arrA: T[], arrB: any[]): T[] {
  const setB = new Set(arrB);
  return [...new Set(arrA)].filter(x => !setB.has(x));
}
export function arrIntersection<T>(arrA: T[], arrB: any[]): T[] {
  const setB = new Set(arrB);
  return [...new Set(arrA)].filter(x => setB.has(x));
}
export function objTransform(obj: { [key: string]: any }, func: (key: string, value: any) => [any, any] | null): { [key: string]: any } {
  //@ts-ignore
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => func(k, v)).filter(d => d));
}
export function objFilterPrefix(obj: { [key: string]: any }, prefix: string): { [key: string]: any } {
  return objTransform(obj, (k, v) => k.startsWith(prefix) ? [k.slice(prefix.length), v] : null);
}
export function objGroupBy<T>(obj: { [key: string]: T }, func: (key: string, value: any) => any): { [key: string | number | symbol]: { [key: string]: T } } {
  const out = {};
  for (let [k, v] of Object.entries(obj)) {
    const key = func(k, v);
    if (!out[key]) out[key] = {};
    out[key][k] = v;
  }
  return out;
}
export function arrGroupBy<T>(elems: T[], func: (elem: T, i?: number) => string | number | symbol): { [key: string | number | symbol]: { [key: string]: T } } {
  const out = {};
  for (let i = 0; i < elems.length; i++) {
    const key = func(elems[i], i);
    if (!out[key]) out[key] = [];
    out[key].push(elems[i]);
  }
  return out;
}
export function objPartition(obj: { [key: string]: any }, func: (key: string, value: any) => boolean | any) {
  const out: [{ [key: string]: any }, { [key: string]: any }] = [{}, {}];
  for (let [k, v] of Object.entries(obj)) {
    out[func(k, v) ? 0 : 1][k] = v;
  }
  return out;
}

export function groupBy<T, Out, K>(
  elems: T[],
  by: (elem: T, i?: number) => K,
  func: (elems: T[], key?: K) => Out,
  action: 'apply' | 'transform' = 'apply',
): Out[] {
  const elemKeys: [T, K][] = elems.map((elem, i) => [elem, by(elem, i)]);
  const groups = new Map<K, T[]>();
  elemKeys.forEach(([elem, key]) => {
    const currentList = groups.get(key)
    currentList ? currentList.push(elem) : groups.set(key, [elem]);
  });
  const aggByKey = new Map<K, Out>();
  groups.forEach((elems, key) => aggByKey.set(key, func(elems, key)));
  if (action == 'apply') return [...aggByKey.values()];
  if (action == 'transform') return elemKeys.map(([e, key]) => asNotNull(aggByKey.get(key)));
  throw new Error(`Invalid action: ${action}. Expected apply or transform`);
}


export const rand32 = () => Math.floor(Math.random() * (1 << 32));
/** random string of letters only */
export const randAZ = (length: number) => {
  const rand = crypto.getRandomValues(new Uint8Array(length * 2));
  let out = btoa(String.fromCharCode(...rand)).replace(/[+/]|\d/g, "");
  if (out.length < length) out += randAZ(length);
  return out.substring(0, length);
}


type JSX_Element = import('jsx-dom').JSX.Element;

// Function with multiple signatures.
type randomCssIdentifierType = {
  (): string;
  (length: number): string;
  (fixedID: string): string;
  (func: (cls: string) => JSX_Element): JSX_Element;
  (length: number, func: (cls: string) => JSX_Element): JSX_Element;
  (fixedID: string, func: (cls: string) => JSX_Element): JSX_Element;
  (func: (cls: string) => Promise<JSX_Element>): Promise<JSX_Element>;
  (length: number, func: (cls: string) => Promise<JSX_Element>): Promise<JSX_Element>;
  (fixedID: string, func: (cls: string) => Promise<JSX_Element>): Promise<JSX_Element>;
};
// https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
export const randomCssIdentifier: randomCssIdentifierType = asAny((...args) => {
  if (!args.length) return _randomCssIdentifier();
  if (args.length == 1) {
    if (typeof args[0] == 'number') return _randomCssIdentifier(args[0]);
    if (typeof args[0] == 'string') return args[0];
  }
  const arg0 = args.length > 1 ? args[0] : null;
  const func = args[args.length - 1];
  return func(_randomCssIdentifier(arg0));
})
function _randomCssIdentifier(length?: number): string {
  length = length || 8;
  const chars64 = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_1234567890';
  const rand64 = [...crypto.getRandomValues(new Uint8Array(length))].map(i => i % 64);
  rand64[0] = rand64[0] % 54; // ensure the first is a letter 
  return rand64.map(i => chars64.at(i)).join('');
}


export function untilDom<T>(callableQuery: () => T, parent?: Node): Promise<NonNullable<T>> {
  // https://stackoverflow.com/a/61511955/3671939
  const _parent = parent || document.body;
  return new Promise(resolve => {
    let out = callableQuery();
    if (out) return resolve(out);
    const observer = new MutationObserver(() => {
      const out = callableQuery();
      if (!out) return;
      resolve(out);
      observer.disconnect();
    });
    observer.observe(_parent, { childList: true, subtree: true });
  });
}

// Maybe missing: $(document).on('event-name', ... with timeout)


export const asNode = (v: any): Node => {
  if (v instanceof HTMLElement) return v;
  if (v instanceof Text) return v;
  if (isFragment(v)) return v;
  if (isArray(v)) return arrayToFragment(v.map(asNode));
  if (v instanceof Promise) {
    const tmp = asReplaceableNode('');
    v.then(value => {
      const elem = asReplaceableNode(value);
      tmp.replaceWith(elem);
      tmp.replaceWith = (newNode) => elem.replaceWith(newNode);
    });
    return tmp;
  }
  if (v && typeof v.subscribe === 'function') {
    let old = asReplaceableNode('');
    v.subscribe(value => {
      let tmp = asReplaceableNode(value);
      old.replaceWith(tmp);
      old.replaceWith = (newNode) => tmp.replaceWith(newNode);
    });
    return old;
  }
  let as_string: string;
  if (!v && v !== 0) as_string = '';
  else if (typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean' || v instanceof String) as_string = v.toString();
  else as_string = JSON.stringify(v);
  return document.createTextNode(as_string);
}
export const asReplaceableNode = (v: any): ChildNode => {
  const node = asNode(v);
  if (!isFragment(node) && !(node instanceof Text)) return asAny(node);
  const elem = document.createElement('span');
  elem.appendChild(node);
  return elem;
}




export class RX<T> { // My "RX" is known in the literature as "BehaviorSubject": an Observable that always has a value and emits it on subscription
  value: T;
  actions: ((arg: T) => any)[];
  constructor(value: T) {
    this.actions = [];
    this.value = value;
  }
  silentSubscribe(action: (arg: T) => any) {
    this.actions.push(action);
  }
  subscribe(action: (arg: T) => any) {
    this.silentSubscribe(action);
    action(this.value);
  }
  set(value: T) { this._set(value); }
  _set(value: T) {
    if (value !== this.value) {
      this.value = value;
      for (let action of this.actions) action(value);
    }
    return value;
  }

  map<T2>(f: (arg: T) => T2): RX<T2> {
    const out = new RX(f(this.value));
    this.silentSubscribe(value => out._set(f(value)));
    return out;
  }
  _textNode: null | Text = null;
  textNode() {
    if (!this._textNode) this._textNode = document.createTextNode(this.value.toString());
    this.silentSubscribe(value => this._textNode.textContent = value.toString());
    return this._textNode;
  }

  nodeRX(f: (arg: T) => Node): ChildNode {
    let old = asReplaceableNode(f(this.value));
    this.silentSubscribe(value => {
      let tmp = asReplaceableNode(f(value));
      old.replaceWith(tmp);
      old = tmp;
    });
    return old;
  }

  static or(...rxs): RX<any[]> {
    const obj = new RX(rxs.map(x => x.value));
    for (let i in rxs) rxs[i].silentSubscribe(x => obj.set((obj.value[i] = x, [...obj.value])))
    return obj;
  }
  static asRX(rx_or_constant): RX<any> {
    return (rx_or_constant instanceof RX) ? rx_or_constant : new RX(rx_or_constant);
  }

  /** Use local storage */
  ls(key: string): this {
    const lsValue = localStorage.getItem(key);
    if (lsValue) this.set(JSON.parse(lsValue));
    this.subscribe((newValue) => localStorage.setItem(key, JSON.stringify(newValue)));
    return this;
  }
}

export const getUrl = (path: string) => new URL(path, document.baseURI).href;


/**
# Events:     ||||   ||     |   | | | |  
# Debounce:   -----| ---|   --| --------|
# Throttle:   |--|-- |--|-- |-- |--|--|--
# Debounce*:  |----- |--    |-- |------- 
# Deb+thr:    --|--| --|--| --| --|--|--|
*/

export function debounced_throttle(func: Function, debounce_ms: number = 0, throttle_ms: number = 0) {
  // Optimized special cases:
  if (!throttle_ms) return debounce(func, debounce_ms);
  if (!debounce_ms) return throttle(func, throttle_ms);
  // General case:
  const now = () => new Date().getTime();
  let debouncing = true;
  let debounceTime: number;
  let throttleCount = 0;
  let locked = false;
  return async function () {
    if (debouncing) debounceTime = now() + debounce_ms;
    else ++throttleCount;
    if (locked) return;
    locked = true;
    while (now() < debounceTime) await sleep(debounceTime - now()); // debouncing loop
    debouncing = false;
    let cnt = throttleCount - 1;
    while (cnt < throttleCount) {
      cnt = throttleCount;
      const throttleTime = now() + throttle_ms;
      try { await asPromise(func()); } catch (err) { }
      await sleep(Math.max(0, throttleTime - now()));
    }
    locked = false;
    debouncing = true;
  }
}
export function throttle(func: Function, throttle: number) {
  const now = () => new Date().getTime();
  let locked = false;
  let lastArgs: any[] | null = null;
  return async function (...args) {
    lastArgs = [...args];
    if (locked) return;
    locked = true;
    try {
      for (let _lastArgs = lastArgs; _lastArgs !== null; lastArgs = null) {
        const throttleTime = now() + throttle;
        try { await asPromise(func(..._lastArgs)); } catch (err) { }
        await sleep(Math.max(0, throttleTime - now()));
      }
    } finally {
      locked = false;
    }
  }
}
export function debounce(func: Function, debounce: number = 0): Function {
  const now = () => new Date().getTime();
  let debounceTime: number;
  let locked = false;
  return async function wrapper() {
    debounceTime = now() + debounce;
    if (locked) return;
    locked = true;
    while (true) { // loop needed for calls that occur while awaiting func
      while (now() < debounceTime) await sleep(Math.max(0, debounceTime - now())); // debouncing loop
      try { await asPromise(func()); } catch (err) { }
      if (now() >= debounceTime) break;
    }
    locked = false;
  };
}



// jsx-dom stuff

export function childrenToArray(children: any): ChildNode[] {
  if (isArray(children)) return children;
  if (isFragment(children)) return [...children.childNodes];
  if (!children) return [];
  return [children];
}
export function arrayToFragment(children: Node[]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  for (let child of childrenToArray(children)) fragment.append(child);
  return fragment;
}
export function untilScripts(scriptsFragment: DocumentFragment | Node): Promise<void> {
  const key = `scripts-loaded-${randomCssIdentifier()}`;
  const promise: Promise<void> = new Promise((resolve) => {
    const listener = (ev) => {
      document.removeEventListener(key, listener);
      resolve();
    }
    document.addEventListener(key, listener);
  });
  const script = document.createElement('script');
  script.textContent = `document.dispatchEvent(new CustomEvent(${JSON.stringify(key)}));`
  const scripts = [...childrenToArray(scriptsFragment), script];
  document.head.append(arrayToFragment(scripts));
  return promise;
}
export function untilScript(src): Promise<void> {
  const script = document.createElement('script');
  script.src = src;
  const promise: Promise<void> = new Promise((resolve) => {
    script.addEventListener('load', () => resolve());
  });
  document.head.append(script);
  return promise;
}

type AsyncComponentType = {
  (elem: Promise<ChildNode>, tmp?: ChildNode): HTMLElement;
  (func: () => Promise<ChildNode>, tmp?: ChildNode): HTMLElement;
};
export const AsyncComponent: AsyncComponentType = (elem, tmp?) => {
  if (typeof elem === 'function') return AsyncComponent(elem(), tmp);
  tmp = asReplaceableNode(tmp);
  asPromise(elem).then(value => {
    const newElem = asReplaceableNode(value);
    tmp.replaceWith(newElem);
  });
  return tmp;
}

export class Random {
  seed: number;
  constructor(seed: number | string) {
    // if string, hash it to a number, in compact way using reduce
    if (typeof seed === 'string') {
      seed = seed.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
    }
    this.seed = seed;
  }
  _next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  random() { return this._next(); }
  nextInt(max: number) { return Math.floor(this.random() * max); }
  normal(n?: number) {
    if (n === undefined) return this.normal(1)[0];
    const out: number[] = [];
    while (out.length < n) {
      let u = this.random() * 2 - 1;
      let v = this.random() * 2 - 1;
      let s = u * u + v * v;
      if (s >= 1) continue;
      let x = Math.sqrt(-2 * Math.log(s) / s) * u;
      let y = Math.sqrt(-2 * Math.log(s) / s) * v;
      out.push(x);
      out.push(y);
    }
    if (out.length > n) out.pop();
    return out;
  }
}
