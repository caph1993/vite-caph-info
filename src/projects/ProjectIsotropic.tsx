import { math } from '../math';
import { lang$ } from '../language';
import { Switch } from '../cpComponents';

let url = 'https://scholar.google.com.co/citations?view_op=view_citation&hl=en&user=hoQx1RIAAAAJ&citation_for_view=hoQx1RIAAAAJ:7PzlFSSx8tAC';

export default <Switch key$={lang$.key$}>
  <div data-case="en" data-default>
    <h2>2024 - Isotropic distributions in the p-norm <a href={url}>(see the paper)</a></h2>
    <p>
      Paper about the generation of random vectors on the n-dimensional unit p-sphere (surface) in such a way that their direction is "uniform".
      {' '}
      I proved that
    </p>
    <ul>
      <li>These algorithms are equivalent for all {math`n \geq 2`} if and only if {math`p\in\{1,2,\infty\}`}:
        <ol>
          <li>sample the p-sphere, uniformly in the euclidean sense</li>
          <li>sample the p-ball (volume), uniformly in the euclidean sense, and project the vector on the p-sphere</li>
          <li>sample the n-dimensional p-isotropic distribution and project the vector on the p-sphere</li>
          <li>sample the p-sphere, uniformly in the sense of the metric induced by the p-norm</li>
        </ol>
      </li>
      <li>A distribution in n-dimensions {(math`n\geq 2`)} is isotropic in the p-norm if and only if its density is given by {math`\[ f(x) = \frac{1}{D} \exp\left( -\frac{d\,\|\mathbf{x}\|_p^p}{p\,b^p} \right) \]`} for some scale {math`b>0`}, where {math`D = \left(\frac{b^d}{2p} (\frac{p}{d})^{\frac{d}{p}} \Gamma(\frac{d}{p})\right)^n`}.
        <br />
        This converges to a uniform distribution in {math`(-b, b)^n`} as {math`p\to\infty`}.
      </li>
      <li>
        The Gaussian, Laplace and uniform distributions are isotropic in different norms, and their heavy tailed counterparts (Cauchy, Lomax and a mixture uniform-pareto) are projections of random directions.
      </li>
    </ul>
    <p>
      I wrote this paper in my free time as a personal project, after finishing my PhD.
    </p>
  </div>
  <div data-case="es">
    <b>2024 - Distribuciones isotrópicas en la norma p <a href={url}>(ver el artículo)</a></b>
    <p>
      Artículo sobre la generación de vectores aleatorios en la superficie de la p-esfera unitaria n-dimensional de tal manera que su dirección sea "uniforme".
      {' '}
      Probé que
    </p>
    <ul>
      <li>Estos algoritmos son equivalentes para todo {math`n \geq 2`} si y solo si {math`p\in\{1,2,\infty\}`}:
        <ol>
          <li>muestrear la p-esfera, uniformemente en el sentido euclidiano</li>
          <li>muestrear la p-bola (volumen), uniformemente en el sentido euclidiano, y proyectar el vector en la p-esfera</li>
          <li>muestrear la distribución p-isotrópica n-dimensional y proyectar el vector en la p-esfera</li>
          <li>muestrear la p-esfera, uniformemente en el sentido de la métrica inducida por la p-norma</li>
        </ol>
      </li>
      <li>Una distribución en n-dimensiones {(math`n\geq 2`)} es isotrópica en la norma p si y solo si su densidad está dada por {math`\[ f(x) = \frac{1}{D} \exp\left( -\frac{d\,\|\mathbf{x}\|_p^p}{p\,b^p} \right) \]`} para algún escala {math`b>0`}, donde {math`D = \left(\frac{b^d}{2p} (\frac{p}{d})^{\frac{d}{p}} \Gamma(\frac{d}{p})\right)^n`}.
        <br />
        Esto converge a una distribución uniforme en {math`(-b, b)^n`} cuando {math`p\to\infty`}.
      </li>
      <li>
        Las distribuciones gaussiana, laplaciana y uniforme son isotrópicas en diferentes normas, y sus contrapartes de colas pesadas (cauchy, lomax y una mezcla uniforme-pareto) son proyecciones de direcciones aleatorias.
      </li>
    </ul>
    <p>
      Escribí este artículo en mi tiempo libre como un proyecto personal, después de terminar mi doctorado.
    </p>
  </div>

  <div data-case="fr">
    <b>2024 - Distributions isotropiques dans la norme p <a href={url}>(voir l'article)</a></b>
    <p>
      Article sur la génération de vecteurs aléatoires sur la surface de la p-sphère unitaire n-dimensionnelle de telle sorte que leur direction soit "uniforme".
      {' '}
      J'ai prouvé que
    </p>
    <ul>
      <li>Ces algorithmes sont équivalents pour tout {math`n \geq 2`} si et seulement si {math`p\in\{1,2,\infty\}`}:
        <ol>
          <li>échantillonner la p-sphère, uniformément au sens euclidien</li>
          <li>échantillonner la p-balle (volume), uniformément au sens euclidien, et projeter le vecteur sur la p-sphère</li>
          <li>échantillonner la distribution p-isotropique n-dimensionnelle et projeter le vecteur sur la p-sphère</li>
          <li>échantillonner la p-sphère, uniformément au sens de la métrique induite par la p-norme</li>
        </ol>
      </li>
      <li>Une distribution en n-dimensions {(math`n\geq 2`)} est isotropique dans la norme p si et seulement si sa densité est donnée par {math`\[ f(x) = \frac{1}{D} \exp\left( -\frac{d\,\|\mathbf{x}\|_p^p}{p\,b^p} \right) \]`} pour une échelle {math`b>0`}, où {math`D = \left(\frac{b^d}{2p} (\frac{p}{d})^{\frac{d}{p}} \Gamma(\frac{d}{p})\right)^n`}.
        <br />
        Cela converge vers une distribution uniforme dans {math`(-b, b)^n`} lorsque {math`p\to\infty`}.
      </li>
      <li>
        Les distributions gaussienne, laplacienne et uniforme sont isotropiques dans différentes normes, et leurs contreparties à queue lourde (cauchy, lomax et un mélange uniforme-pareto) sont des projections de directions aléatoires.
      </li>
    </ul>
    <p>
      J'ai écrit cet article pendant mon temps libre en tant que projet personnel, après avoir terminé mon doctorat.
    </p>
  </div>
  <div data-case="de">
    <b>2024 - Isotropische Verteilungen in der p-Norm <a href={url}>(siehe den Artikel)</a></b>
    <p>
      Artikel über die Erzeugung von Zufallsvektoren auf der n-dimensionalen Einheits-p-Sphäre (Oberfläche) auf eine Weise, dass ihre Richtung "gleichmäßig" ist.
      {' '}
      Ich habe bewiesen, dass
    </p>
    <ul>
      <li>Diese Algorithmen sind für alle {math`n \geq 2`} äquivalent, wenn und nur wenn {math`p\in\{1,2,\infty\}`}:
        <ol>
          <li>aus der p-Einheitssphäre, gleichmäßig im euklidischen Sinne, auswählen</li>
          <li>aus dem p-Einheitskugel (Volumen), gleichmäßig im euklidischen Sinne, auswählen und den Vektor auf die p-Sphäre projizieren</li>
          <li>aus der n-dimensionalen p-isotropischen Verteilung auswählen und den Vektor auf die p-Sphäre projizieren</li>
          <li>aus der p-Einheitssphäre, gleichmäßig im Sinne der Metrik, die durch die p-Norm induziert wird, auswählen</li>
        </ol>
      </li>
      <li>Eine Verteilung in n-Dimensionen {(math`n\geq 2`)} ist isotrop in der p-Norm, wenn und nur wenn ihre Dichte durch {math`\[ f(x) = \frac{1}{D} \exp\left( -\frac{d\,\|\mathbf{x}\|_p^p}{p\,b^p} \right) \]`} für eine Skala {math`b>0`} gegeben ist, wobei {math`D = \left(\frac{b^d}{2p} (\frac{p}{d})^{\frac{d}{p}} \Gamma(\frac{d}{p})\right)^n`}.
        <br />
        Dies konvergiert zu einer gleichmäßigen Verteilung in {math`(-b, b)^n`} für {math`p\to\infty`}.
      </li>
      <li>
        Die Gauß-, Laplace- und Uniform-Verteilungen sind in verschiedenen Normen isotrop, und ihre schweren Schwanz-Gegenstücke (Cauchy, Lomax und eine Mischung aus Uniform-Pareto) sind Projektionen zufälliger Richtungen.
      </li>
    </ul>
    <p>
      Ich habe diesen Artikel in meiner Freizeit als persönliches Projekt geschrieben, nachdem ich meinen Doktortitel erworben hatte.
    </p>
  </div>
</Switch>