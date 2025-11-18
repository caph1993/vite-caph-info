import './css-global';
import { RX } from './cpUtils';
import HomeBody from './Home';
import { LanguageSelector, LanguageSwitch } from './language'
import { themeButton } from './css-global/theme';

import css from './App.module.css';

const route$ = new RX(window.location.hash);
window.addEventListener('popstate', () => route$.set(window.location.hash));

const MainRouter = () => {
  const component = <div></div>;
  const router = async (route: string) => {
    switch (route) {
      case '#!teaching': return (await import('./Teaching')).default;
      case '#!projects': return (await import('./Projects')).default;
      case '': return HomeBody;
      default: return () => <><span>URL ${route} not found.</span><br /><a href="#">Go to the homepage</a></>;
    }
  }
  route$.subscribe(async route => {
    const Replacement = await router(route);
    $(component).html('');
    $(component).append(<Replacement />);
  })
  setTimeout(() => {
    // Pre-cache possible next routes:
    import('./Teaching');
    import('./Projects');
  }, 500);
  return component;
}

let main = <div class={css.mainParent}>
  <div class={css.navbarParent}>
    <div class={css.navbarBody}>
      <div><LanguageSelector></LanguageSelector></div>
      <div>
        <a href="#">
          <LanguageSwitch>
            <span data-language="en">Home</span>
            <span data-language="es">Inicio</span>
            <span data-language="fr">Accueil</span>
            <span data-language="de">Start</span>
          </LanguageSwitch>
        </a>
      </div>
      <div>
        <a href="#!teaching">
          <LanguageSwitch>
            <span data-language="en">Teaching</span>
            <span data-language="es">Cursos</span>
            <span data-language="fr">Enseignement</span>
            <span data-language="de">Unterrichte</span>
          </LanguageSwitch>
        </a>
      </div>
      <div>
        <a href="#!projects">
          <LanguageSwitch>
            <span data-language="en">Projects</span>
            <span data-language="es">Proyectos</span>
            <span data-language="fr">Projets</span>
            <span data-language="de">Projekte</span>
          </LanguageSwitch>
        </a>
      </div>
      {/* <div>
        <a href="./wiki">
          <img class={css.navbarIconWiki} src="/icons/icon-wiki.png" alt="wiki" />
        </a>
      </div> */}
      <div>
        {themeButton}
      </div>
    </div>
  </div>
  <hr class={css.navbarComponentFooter} />
  <div class={css.mainBody}>
    <MainRouter />
    <div class={css.mainEmptyBottom} />
  </div>
</div>
export default main;

$(main).appendTo("body");
//color: #0c4090;
$('<link>', { rel: 'stylesheet', href: '/fonts/font-lmroman.css' }).appendTo('head');


