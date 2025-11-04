import { RX } from './cpUtils';
import { Switch } from './cpComponents';
import css from './language.module.css';

interface Language {
  key: string, name: string, short: string, country: string,
}

const languages = {
  en: { key: 'en', name: 'English', short: 'EN', country: 'us' },
  es: { key: 'es', name: 'Español', short: 'ES', country: 'co' },
  de: { key: 'de', name: 'Deutsch', short: 'DE', country: 'de' },
  fr: { key: 'fr', name: 'Français', short: 'FR', country: 'fr' },
};

class LangRX extends RX<Language> {
  languages = languages;
  languageKeys = Object.keys(languages);
  unicodeFlags = { us: '🇺🇸', co: '🇨🇴', de: '🇩🇪', un: '🇺🇳', fr: '🇫🇷' };
  key$: RX<string>;
  constructor(value) {
    super(value);
    this.key$ = this.map((lang) => lang.key);
  }
  // Generic type T:
  switch({ en, es, de, fr }) {
    let elems = { en, es, de, fr };
    let defaultKey = ['en', 'es', 'fr', 'de'].filter(key => elems[key])[0];
    return this.key$.map((key) => elems[key] || elems[defaultKey]);
  }
}

//@ts-ignore
const _lang: 'en' | 'es' | 'de' | 'fr' = (navigator.language || navigator.userLanguage || '').slice(0, 2);

export const lang$ = new LangRX(languages[_lang] || languages['en']).ls('lang$');

export let isSmallScreen$ = new RX(window.innerWidth < 500);
$(window).on('resize', () => isSmallScreen$.set(window.innerWidth < 500));

export const LanguageSelector = () => {
  let component = <select class={css.selector} aria-label="Language selector" title="Select language"></select>
  component.onchange = (e) => lang$.set(languages[e.target['value']]);
  const options = lang$.languageKeys.map(key => {
    const e = (<option value={key}></option>)
    lang$.subscribe(lang => $(e).prop('selected', key == lang.key));
    isSmallScreen$.subscribe(isSmallScreen => {
      e.textContent = isSmallScreen ?
        lang$.languages[key].short :
        `${lang$.unicodeFlags[lang$.languages[key].country]} ${lang$.languages[key].name}`;
    });
    return e;
  })
  $(component).append(...options);
  return component;
}


export const LanguageSwitch = ({ children }) => {
  const component = <div>{children}</div>
  function update() {
    let childrenLangs = children.map(child => ({
      language: $(child).attr('data-language'),
      elem: child,
    }));
    let exists = {};
    for (let { language } of childrenLangs) exists[language] = true;
    let langKey = exists[lang$.value.key] ? lang$.value.key : !Object.keys(exists).length || exists['en'] ? 'en' : [...Object.keys(exists)][0];
    if (childrenLangs.filter(({ language }) => language == langKey).length == 0) langKey = 'en';
    for (let { language, elem } of childrenLangs) {
      $(elem).prop('hidden', language != langKey);
    }
  }
  lang$.subscribe(update);
  update();
  // new MutationObserver(mutationsList => {
  //   for (let mutation of mutationsList) {
  //     if (mutation.type === 'childList') {
  //       if (root.children.length) {
  //         $(component).replaceChildren(...root.children);
  //         onChildren();
  //       }
  //     }
  //   }
  // }).observe(root, { childList: true });
  return component;
}


export const Translations = ({ en, es, de, fr, children }: { en?: string, es?: string, de?: string, fr?: string, children?: any }) => {
  return <Switch key$={lang$.key$} span>
    {en && (<span data-case="en">{en}</span>)}
    {es && (<span data-case="es">{es}</span>)}
    {fr && (<span data-case="fr">{fr}</span>)}
    {de && (<span data-case="de">{de}</span>)}
    {children}
  </Switch>
}
