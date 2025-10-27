import './css-size-variables.css';
import './css-keywords.css';
import './css-global.css';

$(() => {
  function updateCSSVariables() {
    $('html').css('--window-inner-width', window.innerWidth + 'px');
    $('html').css('--window-inner-height', window.innerHeight + 'px');
    $('html').css('--vw', window.innerWidth * 0.01 + 'px');
    $('html').css('--vh', window.innerHeight * 0.01 + 'px');
  }
  $(window).on('resize', () => updateCSSVariables());
  $(window).trigger('resize');
});

setTimeout(() => {
  import('./fonts.css');
}, 1);