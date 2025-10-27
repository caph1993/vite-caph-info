//@ts-check
import { styled } from 'jsx-dom';
import { Switch } from './cpComponents';
import { lang$, LanguageSwitch, Translations } from './language';
import { SwitchMore } from './SwitchMore';


const Course = ({ code, names, children }) => {
  const CourseCode = styled.div`font-weight: bold;`;
  const CourseName = styled.div`font-style: italic;`;
  const CourseTag = styled.div`margin: 1.2em 0 1.2em 0;`;
  const name = <CourseName />;
  lang$.subscribe(lang => name.textContent = names[lang.key] || names['en']);
  return <CourseTag><CourseCode>{code}</CourseCode>{name}{children}</CourseTag>;
}

const syllabus = (href) => <Switch key$={lang$.key$} span>
  <a href={href} data-case="en">Course syllabus</a>
  <a href={href} data-case="es">Programa del curso</a>
  <a href={href} data-case="de">Inhalt des Unterrichts</a>
  <a href={href} data-case="fr">Contenu du cours</a>
</Switch>

const officialWebsite = (href) => <Switch key$={lang$.key$} span>
  <a href={href} data-case="es">Página web oficial</a>
  <a href={href} data-case="en">Official webpage</a>
  <a href={href} data-case="de">Offizielle Webseite</a>
  <a href={href} data-case="fr">Site officiel</a>
</Switch>

const QuickSwitch = ({ data, ...props }) => {
  const element = <span {...props} />;
  lang$.subscribe(lang => {
    element.textContent = data[lang.key] || data['en'];
  });
  return element;
}


const TeachingBody = () => <>
  <h2>
    <QuickSwitch key$={lang$.key$} data={{
      en: "Computer programming",
      es: "Programación de computadores",
      de: "Programmierung",
      fr: "Programmation",
    }} />
  </h2>

  <Course code={'École Polytechnique, CSE101 2021-2022'} names={{}}>

    {officialWebsite('https://moodle.polytechnique.fr/course/view.php?id=12833')}
  </Course>

  <Course code={'École Polytechnique, CSE101 2020-2021'} names={{}}>

    {officialWebsite('https://moodle.polytechnique.fr/course/view.php?id=10191')}
  </Course>

  <h2>
    <QuickSwitch key$={lang$.key$} data={{
      en: "Trees and graphs",
      fr: "Arbres et graphes",
      es: "Árboles y grafos",
      de: "Bäume und Graphen",
    }} />
  </h2>
  <Course code={'Javeriana Cali, AGRA 2019-2'} names={{}}>

    {syllabus('https://drive.google.com/file/d/1vvz4TLB-L3mfENfaXJgwAzzQ897hQUm4/view?usp=sharing')}
    <div>
      <a href="https://www.caph.info/wiki/#agra-2019-2">
        <Translations
          en="Course wiki"
          es="Wiki del curso"
          de="Wiki des Unterrichts"
          fr="Wiki du cours">
        </Translations>
      </a>
    </div>
    {officialWebsite('http://www.camilorocha.info/teaching/agra/2019-2]')}
  </Course>

  <Course code={'Javeriana Cali, AGRA 2019-1'} names={{}}>
    {syllabus("https://drive.google.com/file/d/192P_Eg9qwKWi67FQFfdRjmUUSej6PheB/view?usp=sharing")}
    <br />
    {officialWebsite('http://www.camilorocha.info/teaching/agra/2019-1]')}
  </Course>
  <Course code={'Javeriana Cali, AGRA 2018-2'} names={{}}>
    {syllabus("https://drive.google.com/file/d/1FPw2bQ61SllP7PHPBZKgz7f7Jq-99XbD/view?usp=sharing")}
    <br />
    {officialWebsite('http://www.camilorocha.info/teaching/agra/2018-2]')}
  </Course>

  <h2>
    <QuickSwitch key$={lang$.key$} data={{
      es: "Programación imperativa modular",
      en: "Modular imperative programming",
      de: "Modulare imperative Programmierung, Escuela Colombiana de Ingeniería",
      fr: "Programmation impérative modulaire, Escuela Colombiana de Ingeniería"
    }} />
  </h2>
  <Course code={'Escuela Colombiana de Ingeniería, PIMO 2018-1'} names={{}}>
    {syllabus("./files/home/teaching/2018-1-pimo/contents.pdf")}
    <div>
      <Translations es="Problemas originales para el curso:"
        en="Problems (designed by myself):"
        de="Probleme für den Unterricht:">
      </Translations>
      {(() => {
        const problemsPIMO =
          [
            {
              href: "./files/home/teaching/2018-1-pimo/problems/mini-tetris.pdf",
              name: "Mini tetris",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/fiesta.pdf",
              name: "La mega fiesta",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/viaje1.pdf",
              name: "Bonos de viaje 1",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/viaje2.pdf",
              name: "Bonos de viaje 2",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/sum-game.pdf",
              name: "Largest sum game solved",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/3-balanceados.pdf",
              name: "Arreglos 3 balanceados",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/3-medianos.pdf",
              name: "Arreglos 3 medianos",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/banco.pdf",
              name: "Fila en el banco",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/calidad.pdf",
              name: "Estudio de calidad",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/lcqs.pdf",
              name: "Longest Common Quasi Subsequence",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/museo1.pdf",
              name: "Una noche en el museo 1",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/museo2.pdf",
              name: "Una noche en el museo 2",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/museo3.pdf",
              name: "Una noche en el museo 3",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/pq1.pdf",
              name: "Cola de prioridad lenta 1",
            },
            {
              href: "./files/home/teaching/2018-1-pimo/problems/pq2.pdf",
              name: "Cola de prioridad lenta 2",
            },
          ];
        return <ul>{problemsPIMO.map(({ href, name }) => <li><a download href={href}>{name}</a></li>)}</ul>;
      })()}
    </div>
  </Course>

  <h2>
    <QuickSwitch key$={lang$.key$} data={{
      es: "Álgebra lineal",
      en: "Linear algebra",
      de: "Lineare Algebra",
      fr: "Algèbre linéaire",
    }} />
  </h2>
  <Course code={'Escuela Colombiana de Ingeniería, ALLI 2018-1'} names={{}}>
    {syllabus('./files/home/teaching/2018-1-alli/contents.pdf')}
  </Course>
  <h2>
    <QuickSwitch key$={lang$.key$} data={{
      es: "Algoritmos",
      en: "Algorithms",
      de: "Algorithmen",
      fr: "Algorithmes",
    }} />
  </h2>

  <Course code={'Escuela Colombiana de Ingeniería, ALGO 2018-1'} names={{}}>
    {syllabus('./files/home/teaching/2018-1-algo/contents.pdf')}
  </Course>
</>


export default TeachingBody;