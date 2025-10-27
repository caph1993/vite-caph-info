//@ts-check
import { AsyncComponent, throttle } from '../cpUtils';


(async () => {
  const { default: Header } = await import('../Header');
  $('head').append(<Header />);
  // Ensure jquery was loaded from CDN

  $('<style>').html(`
  .floating-buttons {
    position: absolute;
    top: 2vh;
    right: 2vw;
    z-index: 1000;
  }
  .floating-buttons button {
    border: none;
    border-radius: 5%;
    opacity: 0.01;
    background-color: var(--marp-background-weak);
  }
  .floating-buttons button:hover {
    opacity: 1.0;
  }
  `).appendTo('head');

  const Component = ({ }) => {
    return <>
      {/* <div class="floating-buttons">
        <button class="box-shadow" onClick={() => document.location.href = "https://caph1993.github.io/phd-thesis-slides/"} > 🌎</button>
        <button class="box-shadow" onClick={() => $(document).trigger('set-theme', { theme: 'toggle' })}>🌒🌖</button>
        <FloatingClock />
      </div> */}
      {AsyncComponent(async () => {
        const { default: App } = await (import('../App'));
        return App;
      }, <>Loading...</>)}
    </>;
  }
  $('body').append(<Component />);
})()

