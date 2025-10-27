import { RX, until } from "./cpUtils";

$('<style>').html(`
.switch-hidden{
  display: none
}`).appendTo('head');


export const Switch = ({ key$, children, span = false }) => {
  children = Array.isArray(children) ? children : children ? [children] : [];
  const fragment = span ? <span>{children}</span> : <div>{children}</div>; // At the end, I needed a div to wrap the children
  // if (span) console.log('span', fragment);
  key$.subscribe(key => {
    // Filter out strings and non-elements
    const elems = Array.from(fragment.children).filter(child => child.attributes).map(child => ({
      caseKey: (child.attributes || {})['data-case']?.value,
      isDefault: !!(child.attributes || {})['data-default'],
      elem: child,
    }));
    const anyMatch = elems.filter(({ caseKey }) => caseKey == key).length > 0;
    for (let { caseKey, isDefault, elem } of elems) {
      let show;
      if (key === true) show = true;
      else if (key === false) show = false;
      else if (!caseKey || caseKey == key) show = true;
      else if (!anyMatch && isDefault) show = true;
      else show = false;
      $(elem).toggle(show);
    }
  });
  return fragment;
}




// tab effects: https://alvarotrigo.com/blog/html-css-tabs/
$('<style>').html(`
.tabs-header>label>input {display: none; }
.tabs-parent {width: 100%; }
.tabs-header {
  margin - top: 0.1em;
border-bottom: 1px solid;
}
.tab-label:hover {
  top: -0.25rem;
transition: top 0.25s;
}
.tabs{
  border: solid 1px;
border-top: none;
}
.tab-label {
  padding - left: 1em;
padding-right: 1em;
border-radius: 0.3em 0.3em 0 0;
background: unset;
border: solid 1px;
white-space:nowrap;
cursor: pointer;
}
/* https://stackoverflow.com/a/10148189/3671939 */
.tab-label {white - space:nowrap; }
.tab-label > span{white - space: normal; }

.tab-label-true {
  font - weight: bold;
border-bottom: solid 2px #EBEBEB;
}
.tab-content-false {display:none; }
.tab-content-true {
  display: true;
opacity: 1;
animation-name: fadeInOpacity;
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.15s;
}
@keyframes fadeInOpacity {
  0 % { opacity: 0; }
100% {opacity: 1;}
}
.tab-content-true {padding: 1vw; }
`).appendTo('head');

/** @param {{ entries: [string, string][], defaultKey?: string, localStorageKey?: string }} settings */
const Tabs = ({ entries, defaultKey, localStorageKey }: { entries: [string, string][]; defaultKey?: string; localStorageKey?: string; }, ...children) => {
  const option$ = new RX(defaultKey || entries[0][0]);
  if (localStorageKey) option$.ls(defaultKey || entries[0][0]);
  let zEntries = entries.map(([key, value]) => (
    { key, label$: RX.asRX(value), elem: <input type="radio" /> }
  ));
  const head = zEntries.map(({ key, label$ }) => {
    let input, span;
    const elem = <label class="tab-label" />;
    $(elem).append(
      input = <input type="radio" />,
      span = <span />,
    );
    label$.subscribe(label => span.textContent = label);
    elem.onclick = () => option$.set(key);
    return { key, label$, elem, input };
  });
  children = children.map(child => ({
    key: child.attributes['tab']?.value,
    elem: child,
  }));
  option$.subscribe((option) => {
    for (let { elem, key, input } of head) {
      $(input).prop('checked', option == key);
      $(elem).toggleClass('tab-label-true', option == key);
      $(elem).toggleClass('tab-label-false', option != key);
    }
    for (let { elem, key } of children) {
      $(elem).toggleClass('tab-content-true', option == key);
      $(elem).toggleClass('tab-content-false', option != key);
    }
  });
  return <div class="tabs-parent">
    <div class="tabs-header">
      ${head.map(({ elem }) => elem)}
    </div>
    <div class="tabs">
      ${children.map(({ elem }) => elem)}
    </div>
  </div>;
}



// styling: https://stackoverflow.com/a/10148189/3671939
$('<style>').html(`
div.radio-group{
  display: flex;
  flex-wrap: wrap;
}
div.radio-group > label{
  margin - left:0.25em;
  margin-right:0.25em;
  white-space: nowrap;
  cursor: pointer;
}
div.radio-group > label > span{
  white - space: normal;
}
`).appendTo('head');


export function RadioGroup(entries: [true | string, string | RX<string>][], choice$: RX<any> | null = null) {
  let _choice$ = choice$ || new RX(entries[0][0]);
  const zEntries = entries.map(([key, value]) => {
    const label$ = RX.asRX(value);
    const input = <input type="radio" />;
    const container = <label>{input}{label$.textNode()}</label>;
    container.onclick = (() => _choice$.set(key));
    return { key, input, container };
  });
  _choice$.subscribe(choice => {
    for (let { key, input } of zEntries) {
      $(input).prop('checked', choice == key);
      // put(input, choice == key ? '[checked]' : '[!checked]');
    }
  })
  return <div class="radio-group">{zEntries.map(({ container }) => container)}</div>;
}

$('<style>').html(`.parBreak {margin - top:1em; }`).appendTo('head');
$('<style>').html(`.CodeMirror{ height: 100%; }`).appendTo('head');
function putCodemirror(code, options) {
  const id = 'codemirror-' + ('' + Math.random()).slice(2);
  $('<style>').html(`#${id} .CodeMirror{height: 100%;}`).appendTo('head');
  const codeDiv = <div id={id} />;
  until(() => document.querySelector(`#${id}`)).then(() => {
    options = Object.assign({
      unindent: true,
      keyMap: 'sublime',
      theme: 'default',
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      scrollPastEnd: false,
      autoRefresh: true,
    }, options);
    //@ts-ignore
    CodeMirror(codeDiv, { value: code, ...options });
  });
  return codeDiv;
}