//@ts-check
import { lang$ } from './language';
import { styled } from 'jsx-dom';
import { RX } from './cpUtils';

$('<style>').text(`
.fade-in-out{
  transition: opacity 0.2s ease-in;
}
.more-less-hidden {
  display: none;
}
`).appendTo("body");

export const SwitchMore = ({ children }) => {
  children = Array.isArray(children) ? children : children ? [children] : [];
  const childrenElems = children.filter(child => child.attributes);
  const shown$ = new RX(false);
  const Message = styled.div`
    margin-left: 2em;
    color: green;
    cursor: pointer;
    margin-bottom: 2em;
    margin-top: 1em;
  `
  const message = <Message />
  message.onclick = () => shown$.set(!shown$.value);
  for (let elem of childrenElems) $(elem).addClass('.fade-in-out');
  shown$.subscribe(shown => {
    for (let elem of childrenElems) {
      if (shown) $(elem).show();
      else $(elem).hide();
    }
  });
  const textLess = {
    en: '[Show less]',
    es: '[Ver menos]',
    de: '[Weniger zeigen]',
    fr: '[Montrer moins]'
  }
  const textMore = {
    en: '[Show more]',
    es: '[Ver más]',
    de: '[Mehr zeigen]',
    fr: '[Montrer plus]'
  }
  RX.or(lang$, shown$).subscribe(([lang, shown]) => {
    const msgText = (shown ? textLess : textMore)[lang.key];
    message.textContent = msgText;
  });
  return <>{children}{message}</>;
}