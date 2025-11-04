import './theme.css';
import { RX } from '../cpUtils';

export const theme$ = new RX<'light' | 'dark'>(localStorage.getItem('theme') == 'dark' ? 'dark' : 'light').ls('theme$');

theme$.subscribe(theme => {
  $('html').attr('data-theme', theme);
  $('.light-theme-only').prop('disabled', theme == 'dark');
  $('.dark-theme-only').prop('disabled', theme == 'light');
});

export const setTheme = (theme: 'light' | 'dark' | 'current' | 'toggle') => {
  const current = theme$.value;
  if (theme == 'current') theme = current;
  else if (theme == 'toggle') theme = current == 'dark' ? 'light' : 'dark';
  theme$.set(theme);
}

// Theme toggle button: use Material Design Icons (mdi) for a clean, academic look.
// We render both icons and let CSS show the appropriate one depending on `html[data-theme]`.
export const themeButton = <button class="box-shadow theme-toggle" aria-label="Toggle theme" title="Toggle theme" onClick={() => setTheme('toggle')}>
  <i class="mdi mdi-weather-night theme-icon theme-icon--darkish" aria-hidden="true"></i>
  <i class="mdi mdi-weather-sunny theme-icon theme-icon--sunny"></i>
  <span class="visually-hidden">{theme$.map(v => v == 'light' ? 'Switch to dark theme' : 'Switch to light theme').textNode()}</span>
</button>;
