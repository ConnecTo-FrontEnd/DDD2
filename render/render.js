import eventHolder from './eventHolder.js';
import applyDiff from './applyDiff.js';

let $root = null;
let rootComponentInstance = null;

const bindEventHandler = $root => {
  for (const { type, selector, handler } of eventHolder) {
    if (selector === 'window') window.addEventListener(type, handler);
    else $root.addEventListener(type, handler);
  }
};

const freeEventHandler = $root => {
  for (const { type, selector, handler } of eventHolder) {
    if (selector === 'window') window.removeEventListener(type, handler);
    else $root.removeEventListener(type, handler);
  }
};

const render = (RootComponent, $container) => {
  if ($container) $root = $container;
  if (RootComponent) rootComponentInstance = new RootComponent();

  freeEventHandler($root);
  while (eventHolder.length > 0) eventHolder.pop();

  const $virtual = $root.cloneNode();
  const domString = rootComponentInstance.render();
  $virtual.innerHTML = domString;

  applyDiff($root, $virtual);

  bindEventHandler($root);
};

export default render;
