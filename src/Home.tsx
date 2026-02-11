//@ts-check
import { lang$, LanguageSwitch } from './language';
import { styled } from 'jsx-dom';
import style from './Home.module.css';

const HomePhoto = styled.img`
  margin-bottom: calc(1*var(--vh));
  margin-left: calc(2.5*var(--vw));
  width: 30%;
`;


const links = {
  IPP: (text = "IPP") => <a class="is-external-link" href="https://fr.wikipedia.org/wiki/Institut_polytechnique_de_Paris">{text}</a>,
  lX: (text = "Ecóle Polytechnique") => <a class="is-external-link" href="https://fr.wikipedia.org/wiki/%C3%89cole_polytechnique_(France)">{text}</a>,
  PUJCali: (text = "PUJ Cali") => <a class="is-external-link" href="https://en.wikipedia.org/wiki/Pontificia_Universidad_Javeriana">{text}</a>,
  ECI: (text = "ECI") => <a class="is-external-link" href="https://es.wikipedia.org/wiki/Escuela_Colombiana_de_Ingenier%C3%ADa">{text}</a>,
  scholar: (text = "Google Scholar") => <a class="is-external-link" href="https://scholar.google.com.co/citations?user=hoQx1RIAAAAJ&hl=en&oi=ao">{text}</a>,
  CV_en: (text = "CV in English") => <a class="is-external-link" href="https://drive.google.com/file/d/1tPIAwDVY_eTpDB641fayBxBVn2e44y-V/view?usp=sharing">{text}</a>,
  CV_es: (text = "Hoja de vida en Español") => <a class="is-external-link" href="https://drive.google.com/file/d/1DRIQH7hGbrS1JJDf1FT6p8koG__KJDm-/view?usp=sharing">{text}</a>,
  CV_de: (text = "Lebenslauf auf Deutsch") => <a class="is-external-link" href="https://drive.google.com/file/d/17wxVvzEmzz2qXpZYIiIq1w3YMOlmAOfj/view?usp=sharing">{text}</a>,
  CV_fr: (text = "CV en Français") => <a class="is-external-link" href="https://drive.google.com/file/d/160SwwseNj1qgJNYIuNTn-8XAPrmkTKOp/view?usp=sharing">{text}</a>,
}


const HomeBody = () => <>
  <LanguageSwitch>
    <div data-language="en">
      <h1 class={style.h1}>Carlos Pinzón</h1>

      <strong>Programmer and researcher</strong>

      <p>
        I am researcher and software developer educated in Mathematics and Computer Science with the following degrees:
      </p>

      <ul>
        <li>
          PhD in Mathematics and Informatics from {links.IPP()} - {links.lX()}, France, 2023.
        </li>
        <li>
          Master in Engineering (Computer Science) from {links.PUJCali()}, Colombia, 2020.
        </li>
        <li>
          Bachelor in Mathematics from {links.ECI()}, Bogotá, Colombia, 2018.
        </li>
        <li>
          Bachelor in Electronics from {links.ECI()}, Bogotá, Colombia, 2017.
        </li>
      </ul>

      <p>
        I have worked in the industry as Data Analyst and Software Developer for 2.5 years in the development of Machine Learning based forecasting models and web dashboards. I have also developed and deployed software and prototypes for research, hobbies or collaboration purposes.
      </p>


    </div>
    <div data-language="es">
      <h1 class={style.h1}>Carlos Pinzón</h1>

      <strong>Programador e investigador</strong>

      <p>
        Soy investigador y desarrollador de software educado en Matemáticas y Ciencias de la Computación con los siguientes títulos:
      </p>

      <ul>
        <li>
          Doctorado en Matemáticas e Informática de {links.IPP()} - {links.lX()}, Francia, 2023.
        </li>
        <li>
          Maestría en Ingeniería (Ciencias de la Computación) de {links.PUJCali()}, Colombia, 2020.
        </li>
        <li>
          Licenciatura en Matemáticas de {links.ECI()}, Bogotá, Colombia, 2018.
        </li>
        <li>
          Licenciatura en Electrónica de {links.ECI()}, Bogotá, Colombia, 2017.
        </li>
      </ul>

      <p>
        He trabajado en la industria como Analista de Datos y Desarrollador de Software durante 2.5 años en el desarrollo de modelos de pronóstico basados en Aprendizaje Automático y paneles web. También he desarrollado y desplegado software y prototipos para investigación, pasatiempos o propósitos de colaboración.
      </p>
    </div>
    <div data-language="fr">
      <h1 class={style.h1}>Carlos Pinzón</h1>

      <strong>Programmeur et chercheur</strong>

      <p>
        Je suis chercheur et développeur de logiciels avec des études en mathématiques et en informatique. J'ai les diplômes suivants :
      </p>

      <ul>
        <li>
          Doctorat en mathématiques et informatique de {links.IPP()} - {links.lX()}, France, 2023.
        </li>
        <li>
          Master en ingénierie (informatique) de {links.PUJCali()}, Colombie, 2020.
        </li>
        <li>
          Licence en mathématiques de {links.ECI()}, Bogotá, Colombie, 2018.
        </li>
        <li>
          Licence en électronique de {links.ECI()}, Bogotá, Colombie, 2017.
        </li>
      </ul>

      <p>
        J'ai travaillé dans l'industrie en tant qu'analyste de données et développeur de logiciels pendant 2,5 ans dans le développement de modèles de prévision basés sur l'apprentissage automatique et des tableaux de bord Web. J'ai également développé et déployé des logiciels et des prototypes à des fins de recherche, de loisirs ou de collaboration.
      </p>
    </div>
    <div data-language="de">
      <h1 class={style.h1}>Carlos Pinzón</h1>

      <strong>Programmierer und Forscher</strong>

      <p>
        Ich bin Forscher und Softwareentwickler mit Fachkenntnissen in Mathematik und Informatik. Ich habe die folgende Abschlüsse erworben:
      </p>

      <ul>
        <li>
          PhD in Mathematik und Informatik von {links.IPP()} - {links.lX()}, Frankreich, 2023.
        </li>
        <li>
          Master in Ingenieurwesen (Informatik) von {links.PUJCali()}, Kolumbien, 2020.
        </li>
        <li>
          Bachelor in Mathematik von {links.ECI()}, Bogotá, Kolumbien, 2018.
        </li>
        <li>
          Bachelor in Elektronik von {links.ECI()}, Bogotá, Kolumbien, 2017.
        </li>
      </ul>

      <p>
        Ich habe 2,5 Jahre in der Industrie als Datenanalyst und Softwareentwickler gearbeitet und dabei Machine-Learning-basierte Prognosemodelle und Web-Dashboards entwickelt. Ich habe auch Software und Prototypen für Forschungs-, Hobby- oder Kollaborationszwecke entwickelt und bereitgestellt.
      </p>
    </div>
  </LanguageSwitch>

  <div style="display:flex; justify-content:center; width:100%;">
    <HomePhoto class="main-photo" src="/photos/photo-2024-desk-25.jpg" />
  </div>
  <h2>Curriculum vitae</h2>
  <ul>
    <li>{links.CV_en("CV in English 🇺🇳")}</li>
    <li>{links.CV_es("Hoja de vida en Español 🇨🇴")}</li>
    <li>{links.CV_fr("CV en Français 🇫🇷")}</li>
    <li>{links.CV_de("Lebenslauf auf Deutsch 🇩🇪")}</li>
  </ul>
  <hr />
</>;

export default HomeBody;
