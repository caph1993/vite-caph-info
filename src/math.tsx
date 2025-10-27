import { assertNotUndefined, until, untilScript, untilScripts } from "./cpUtils";

export function math(htmlTemplateString: TemplateStringsArray, ...variables) {
  let seq: string[] = [...(htmlTemplateString.raw || htmlTemplateString)];
  // The first and last variables can be used to invoke custom "loading" and "onLoad" functions
  let loading, onLoad;
  if (variables.length && seq[0] == '' && typeof variables[variables.length - 1] == "function") {
    loading = variables.shift();
    seq.shift()
  }
  if (variables.length && seq[seq.length - 1] == '' && typeof variables[variables.length - 1] == "function") {
    if (seq.length > 2 || seq[seq.length - 2] != '') {
      onLoad = variables.pop();
      seq.pop();
    }
  }
  let formula = seq.map((_, i) => (i > 0 ? variables[i - 1].toString() : '') + seq[i]).join('');
  let displayMode = false;
  // Remove external parentheses if present:
  let m = (formula.match(/^\s*\\\[(.*?)\\\]\s*$/s) || formula.match(/^\s*\$\$(.*?)\$\$\s*$/s));
  if (m) { displayMode = true, formula = m[1]; }
  else {
    m = (formula.match(/^\s*\\\((.*?)\\\)\s*$$/s) || formula.match(/^\s*\$(.*?)\$\s*$/s));
    if (m) formula = m[1];
  }
  return settings.factory.render(formula, { displayMode, loading, onLoad });
}



export const katexFactory = new class {
  queue: { elem: ChildNode, formula: string, displayMode?: boolean, macros?: any, onLoad?: (Node) => any }[];
  isLoading: boolean;
  macros: any;
  constructor() {
    this.queue = [];
    this.isLoading = false;
    this.macros = {};
  }
  render(formula: string, { displayMode = false, macros = null, loading = null, onLoad = null }) {
    if (window['katex'] && !this.queue.length) {
      return this._render(formula, { displayMode });
    } else {
      loading = loading || this.loading;
      const elem = loading(formula, { displayMode, macros });
      this.queue.push({ elem, formula, displayMode, macros, onLoad });
      this.untilKatex();
      return elem;
    }
  }
  _render(formula: string, { displayMode = false, macros = null }) {
    macros = macros || this.macros;
    const katex = assertNotUndefined(window['katex']);
    const out = <span></span> as any;
    try {
      katex.render(formula, out, { displayMode, macros });
    } catch (err) {
      console.warn(formula);
      console.error(err);
      katex.render(formula, out, { ...{ displayMode, macros }, throwOnError: false });
    }
    return out.childNodes[0];
  }
  async untilKatex() {
    if (window['katex'] || this.isLoading) return;
    this.isLoading = true;
    $('head').append(<> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" /></>);
    // (async () => {
    //   window['katex'] = (await import('katex'));
    // })()
    $('head').append(<style>{`
      .katex{
        font-size: inherit;
        color: inherit;
      }
    `}</style>);
    await untilScript("https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js");
    this.isLoading = false;
    while (this.queue.length) { // Process elements in FIFO order:
      const { elem, formula, onLoad, ...options } = this.queue.shift();
      const newElem = this._render(formula, options);
      elem.replaceWith(newElem);
      if (onLoad) setTimeout(() => onLoad(newElem), 0);
    }
  }
  loading(formula, { displayMode, macros }) {
    return <span style="font-size:0.2em">(loading {displayMode ? `Math` : 'math'}... {formula})</span>
  }
}


export const settings = { factory: katexFactory };
