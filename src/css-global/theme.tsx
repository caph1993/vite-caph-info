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

export const themeButton = <button class="box-shadow" onClick={() => setTheme('toggle')}>{theme$.map(v => v == 'light' ? "🌒" : "🌖").textNode()}</button>;
