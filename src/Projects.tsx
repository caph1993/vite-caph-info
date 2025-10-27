//@ts-check
import { RX, AsyncComponent } from './cpUtils';
import { RadioGroup, Switch } from './cpComponents';
import { lang$, Translations } from './language';
import { SwitchMore } from './SwitchMore';

import ProjectIsotropic from './projects/ProjectIsotropic';

const RadioPlayer = (name$, href) => {
  const button = <button>{name$.textNode || name$}</button>;
  button.onclick = () => {
    button.replaceWith(
      <figure>
        <figcaption>{name$.textNode || name$}</figcaption>,
        <audio controls src={href}></audio>,
      </figure>
    )
  }
  return button;
}

const projectFilter$ = new RX(true).ls('projects-main-filter');
const projectFilterOptions = RadioGroup([
  [true, lang$.switch({
    en: 'All', es: 'Todos', de: 'Alle', fr: 'Toutes',
  })],
  ['Publications', lang$.switch({
    en: 'Publications', es: 'Publicaciones', de: 'Veröffentlichungen', fr: 'Ouvrages',
  })],
  ['Enterprise', lang$.switch({
    en: 'Enterprise', es: 'Empresarial', de: 'Unternehmen', fr: 'Entreprise',
  })],
  ['Personal', lang$.switch({
    en: 'Personal', es: 'Personal', de: 'Persönlich', fr: 'Personnel',
  })],
], projectFilter$);

$(projectFilterOptions).prepend(lang$.switch({
  en: 'Filter:', es: 'Filtro:', de: 'Filter:', fr: 'Filtre:',
}).textNode())


$('<style>').text(`
.project{
  margin: 1.2em 0 1.2em 0;
}
`).appendTo("body");

const ProjectsBody = () => <div>
  {projectFilterOptions}
  {lang$.switch({
    en: ' ',
    es: '(Mostrando resultados en español e inglés)',
    fr: `(Affichage des résultats en français et en anglais)`,
    de: '(Meisten Ergebnisse sind nur auf Englisch verfügbar)',
  }).textNode()}
  <Switch key$={projectFilter$}>
    {
      // import('./2022-AI-style').then(m => m.default)
    }
    <div class="project" data-case="Publications">
      {ProjectIsotropic}
    </div>

    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2023-2024 - nDArray-JS <a href="https://caph1993.github.io/ndarray-js/">(repository)</a></h2>
          <p>
            Like numpy, but in javascript. This is a library under development for working with n-dimensional arrays in javascript.
            Main features:
          </p>
          <ul>
            <li>Keyword arguments support</li>
            <li>Parser of Python expressions</li>
            <li>All types of indexing and broadcasting supported</li>
          </ul>
        </div>
      </Switch>
    </div>

    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2023 - (NLP) mobileBERT demo</h2>
        </div>
      </Switch>
      <ul>{[<a href="https://github.com/caph1993/mobileBERT">[video and repository]</a>].map(x => <li>{x}</li>)}</ul>
    </div>

    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2022 - AI rnn-piano mirror</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Mirror of piano played by Recursive Neural Network:
          {<a href="./files/public/piano_rnn/performance_rnn.html">[AI piano]</a>}
        </>,
        <>The AI will start playing live from your device after 3 to 12 seconds of loading once you enter the link.</>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>
    {/* 
    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2022 - Radio list`}</h2>
        </div>
      </Switch>
      <ul>{[
        RadioPlayer(
          `FIP lofi:`,
          `https://icecast.radiofrance.fr/fip-lofi.mp3?ID=${(() => {
            const key = 'fip-lofi-id';
            let id = localStorage.getItem(key);
            if (!id) {
              id = ('caph' + ('' + Math.random()).slice(2)).slice(0, 12);
              localStorage.setItem(key, id);
            }
            return id
          })()
          }`,
        ),
        RadioPlayer(
          `Blu radio: (uses a cookie)`,
          "https://playerservices.streamtheworld.com/api/livestream-redirect/BLURADIO_ADP.aac",
        ),
      ].map(x => <li>{x}</li>)}</ul>
      <SwitchMore>
        <ul>{[
          RadioPlayer(
            `RTL:`,
            "https://streamer-04.rtl.fr/rtl-1-44-128",
          ),
          RadioPlayer(
            `France info:`,
            "https://icecast.radiofrance.fr/franceinfo-midfi.mp3",
          ),
        ].map(x => <li>{x}</li>)}</ul>

      </SwitchMore>
    </div> */}

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2022 - Causal Discovery for Fairness`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Written in collaboration with 4 colleagues from {<a href="https://team.inria.fr/Comete/">Comète team</a>
          }, LIX.
          To be presented in {<a href="https://www.afciworkshop.org/">NIPS AFCI workshop</a>
          }.
        </>,
        <>
          We studied different existing algorithms that estimate a causal model based on data. These algorithms seem to be very sensible to their parameters.
        </>,
        <>
          We used the causal models to estimate some fairness-related quantities and measured their sensitivity with respect to the model parameters.
          We found, as in the principle of garbage-in, garbage-out, that fairness measurements are extremely sensible, making them hard to trust.
        </>,
      ].map(x => <li>{x}</li>)}</ul>

    </div>

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2022 - On the impossibility of non-trivial accuracy under fairness constraints</h2>
        </div>
      </Switch>
      <ul>{[
        <>Written in collaboration with Dr. Catuscia Palamidessi, Dr. Pablo Piantanida and Dr. Frank Valencia. Presented at {<a href="https://aaai.org/Conferences/AAAI-22/">AAAI-2022</a>
        }.</>,
        <>
          We extended an existing result that says that under any differential privacy constraint, equal-opportunity and non-trivial accuracy are mutually exclusive in some theoretic scenarios.
          We proved that this may hold even without the differential privacy constraint.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>


    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2022 -`}<code>avispa-lattices</code></h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Deprecated Python {<a href="https://pypi.org/project/avispa-lattices/">pip package</a>
          } for working with mathematical {<a class="clarification" href="https://en.wikipedia.org/wiki/Lattice_(order)">lattices</a>
          }. {<a href="https://colab.research.google.com/drive/1vFD2qMiVxppqbRaurY_wCnvKf03MaI-9#scrollTo=Ru4cVA6LwKB0">Tutorial</a>
          }.
        </>,
        <>
          The library includes a novel hashing technique for lattices, a generator of all lattices of up to size 11, a visualization tool for Jupyter or non-Jupyter users, and a cache that stores expensive computations on each lattice.
        </>,
        <>
          It served as inspiration for more simple (and powerful {<a class="clarification" href="https://en.wiktionary.org/wiki/IMO">IMO</a>
          }) tools using javascript such as {<a href="https://caph1993.github.io/GMeetMono/">these experiments</a>
          }.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2021 - Computing Distributed Knowledge as the Greatest Lower Bound of Knowledge</h2>
        </div>
      </Switch>
      <ul>{[].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2019 - <code>xscreenfilter</code></h2>
          <br />
          Command line tool for changing screen brightness and temperature through console and therefore hotkeys.
          [<a href="https://github.com/caph1993/xscreenfilter">repository</a>].
          <div style="display:flex; justify-content:center">
            <img src='https://raw.githubusercontent.com/caph1993/xscreenfilter/master/demo.gif'></img>
          </div>
        </div>
      </Switch>
    </div>

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2019 - Make Puzzles Great Again`}</h2>
        </div>
      </Switch>
      <ul>{[].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2020 - Algorithmic Analysis of Blockchain Efficiency with Communication Delay`}</h2>
        </div>
      </Switch>
      <ul>{[].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2020 - <code>caph-docs</code></h2>
        </div>
      </Switch>
      <ul>{[].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2020 - <code>amigo-cp</code></h2>
        </div>
      </Switch>
      <ul>{[].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2020 - Master thesis`}</h2>
        </div>
      </Switch>
    </div>


    <div class="project" data-case="Enterprise">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2019 - ABC2 dashboard (enterprise project)`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Web dashboard with forecasts, maps and alerts.
        </>,
        <>
          Carried out in {<a href="https://www.alianzacaoba.co/">Alianza CAOBA</a>
          }, in partnership with {<a href="https://www.grupobancolombia.com/">Bancolombia</a>
          }.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Enterprise">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2019 - Uigo (entrepeneurship)`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Mobile application for carpooling between university students. (extinct)
        </>,
        <>
          The <a href="https://play.google.com/store/apps/details?id=io.ionic.uigo&gl=US">app</a>
          {' '}was developed with <a href="https://ionicframework.com/">Ionic</a>,
          for android and iOS devices. It used angular framework and google firebase.
          It produced a good feeling in the community
          <a href="https://www2.javerianacali.edu.co/javeriana-en-los-medios/uigo-la-app-para-movilidad-sostenible#gsc.tab=0">(example)</a>,
          but we desisted the project after facing lack of incentives and time.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Personal">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <><h2>2019 - <code>caph.info</code></h2></>,
        </div>
      </Switch>
      <ul>{[`Also tiddly wiki and tiddly wiki plugin`].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Enterprise">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2018 - Anonylitics (enterprise project)`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Anonymization of bank data.
        </>,
        <>
          Carried out in {<a href="https://www.alianzacaoba.co/">Alianza CAOBA</a>
          }, in partnership with {<a href="https://www.elcorral.com/">El Corral</a>
          }.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>
    <div class="project" data-case="Enterprise">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2017 - LNG forecast (internship)`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Carried out in {<a href="https://analytics.icis.com/">ICIS analytics</a>
          } (Tschach solutions GmbH), Karlsruhe, Germany.
        </>,
        <>
          I used machine learning tools to forecast the price and offer of different commodities in United Kingdom and Germany.
        </>,
      ].map(x => <li>{x}</li>)}</ul>
    </div>

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>{`2016 - Double-spend attack models with time advantage for Bitcoin`}</h2>
        </div>
      </Switch>
      <ul>{[
        <>
          Written in collaboration with Dr. Camilo Rocha. Presented in {<a href="https://clei.org/clei2016/">CLEI-2016</a>
          }. Published in {<a href="https://doi.org/10.1016/j.entcs.2016.12.006">ENTCS</a>
          }, Elsevier.</>,
        <>
          We developed two mathematical models for studying double-spend attacks in the bitcoin network that take into account probabilistic partial block production in the form of mining-<i>time advantage</i>.
        </>,
        <>
          The models were defined from two different perspectives, one continuous, the other discrete, yet the results were the same for the two, thus suggesting the correctness of the approach
        </>,
      ].map(x => <li>{x}</li>)}</ul>

      <div data-case="es">
        <h2>{`2016 - Modelos para ataques tipo doble-gasto con ventaja temporal para Bitcoin`}</h2>
        <ul>{[
          <>
            Escrito con Dr. Camilo Rocha. Presentado en CLEI-2016. Publicado en ENTCS.
          </>,
          <>
            Desarrollamos dos modelos matemáticos para estudiar ataques double-spend en la red de bitcoin. A diferencia de los modelos existentes, los modelos propuestos tienen en cuenta la producción parcial (probabilística) de bloques en forma de <i>ventaja temporal</i> de minado.
          </>,
          <>
            Los modelos son muy diferentes: uno es continuo y el otro discreto; sin embargo, ambos arrojaron los mismos resultados, sugiriendo así la correctitud de nuestras metodologías.
          </>,
        ].map(x => <li>{x}</li>)}</ul>
        <SwitchMore>
          <Switch key$={lang$.key$}>
            <div data-case="en" data-default>
              <p>Main conclusions:</p>
              <ul>{[
                <>
                  Some conclusions of the model of Meni Rosenfeld were corroborated. Our models yielded the same results when setting t=0 (no time advantage).
                </>,
                <>
                  Time advantage increases the probability of double-spend attacks, however, even with a high (but realistic) time advantage, these attacks are very hard to achieve for a single individual. They require enourmus computational power and their probability of success is very low.
                </>,
              ].map(x => <li>{x}</li>)}</ul>
            </div>
            <div data-case="es">
              <p>Conclusiones principales:</p>
              <ul>{[
                <>
                  Se corroboraron algunos de los resultados del modelo de Meni Rosenfeld. Nuestros modelos arrojaron los mismos valores al ser ejecutados sin ventaja temporal (t=0).
                </>,
                <>
                  La probabilidad de efectuar un ataque tipo double-spend aumenta con la ventaja temporal. No obstante, incluso con una ventaja temporal alta (pero realista), es muy difícil que un individuo solitario complete un ataque, pues los ataques double-spend requieren demasiado poder de cómputo y tienen una probabilidad de éxito muy reducida.
                </>,
              ].map(x => <li>{x}</li>)}</ul>
            </div>
          </Switch>


          <p><Translations
            en="Access:"
            es="Acceso:"
            de="Zugriff:"
          />
          </p>
          <ul>{[
            <a href="https://www.sciencedirect.com/science/article/pii/S157106611630113X?via%3Dihub">{Translations({
              en: "Official link",
              es: "Link oficial",
              de: "Offizieller Link",
            })}</a>,
            <a href="./files/projects/bitcoin-javcali-2018.pdf">{Translations({
              en: "Slides 2018-2 at Javeriana Cali.",
              es: "Diapositivas de 2018-2 en Javeriana Cali. (Inglés)",
              de: "Folien 2018-2, Javeriana Cali. (Englisch)",
            })}</a>,
          ].map(x => <li>{x}</li>)}</ul>
        </SwitchMore>
      </div>
    </div>

    <div class="project" data-case="Publications">
      <Switch key$={lang$.key$}>
        <div data-case="en" data-default>
          <h2>2015 - Ad-compact spaces (mathematics graduation project)</h2>
          <ul>
            <li>
              Final research project for obtaining the mathematics BS. Supervised by Dr. Raúl Pachón.
            </li>
            <li>
              We defined a generalization of compactness in topology named <i>ad-compactness</i>, and studied its main mathematical properties.
            </li>
          </ul>
        </div>
        <div data-case="es">
          <h2>2015 - Espacios ad-compactos</h2>
          <ul>
            <li>
              Supervisado por el Dr. Raúl Pachón. Trabajo final de investigación para obtener el título de matemático.
            </li>
            <li>
              Definimos una generalización de compacidad en topología llamada <i>ad-compacidad</i>, y estudiamos sus propiedades matemáticas más importantes.
            </li>
          </ul>
        </div>

      </Switch>

      <SwitchMore>
        <Switch key$={lang$.key$}>
          <div data-case="en" data-default>
            <p>
              Main conclusions:
            </p>
            <ul>
              <li>
                Ad-compactness can be characterized with base covers. For sub-bases, an additional requirement is needed.
              </li>
              <li>
                Continuous and surjective functions preserve ad-compactness.
              </li>
              <li>
                Open-closed subsets of ad-compact spaces are ad-compact.
              </li>
              <li>
                If a space product is ad-compact, then each factor is ad-compact. The converse is not necessarily true. An additional requirement is needed.
              </li>
              <li>
                Ad-compactness is not related to cl-compactness (defined in a similar final project by J.D. Rodríguez and Dr. Raúl Pachón).
              </li>
            </ul>
          </div>
          <div data-case="es">
            <p>
              Conclusiones principales:
            </p>
            <ul>
              <li>
                La ad-compacidad puede caracterizarse con cubrimientos básicos. Para cubrimientos sub-básicos (teorema de Alexander), es necesario añadir una condición.
              </li>
              <li>
                Las funciones continuas preservan ad-compacidad.
              </li>
              <li>
                Todo subconjunto abierto-cerrado de un espacio ad-compacto es ad-compacto.
              </li>
              <li>
                Si un espacio producto es ad-compacto, entonces cada espacio factor lo es (teorema de Tychonoff). El converso no es necesariamente cierto, se hace necesaria una condición adicional.
              </li>
              <li>
                Ad-compacidad no implica ni es implicada por cl-compacidad (definida en un trabajo final similar por J.D. Rodríguez y el Dr. Raúl Pachón).
              </li>
            </ul>
          </div>
        </Switch>
        <div><p>
          <Translations
            en="Access (spanish only):"
            es="Acceso:"
            de="Zugriff (nur Spanisch):" />
        </p></div>
        <ul>{[
          <a href="https://repositorio.escuelaing.edu.co/handle/001/647" >
            <Translations en="Official link" es="Link oficial" de="Offizieller Link" />
          </a>,
          <a href="./files/projects/ad-compacidad.pdf" download>
            <Translations en="Document mirror" es="Documento en pdf" de="Dokumentenspiegel" />
          </a>,
          <a href="./files/projects/ad-compacidad-slides.pdf" download>
            <Translations en="Slides 2015-2 at ECI." es="Diapositivas de 2015-2 presentadas en la Escuela Colombiana de Ingeniería." de="Folien 2015-2, ECI." />
          </a>,
        ].map(x => <li>{x}</li>)}</ul>
      </SwitchMore>
    </div >
  </Switch >
</div >;

{ /*const projectsBodyOLD = tree(<ul>{[].map(x => <li>{x}</li>)}</ul>*/ }

export default ProjectsBody;
