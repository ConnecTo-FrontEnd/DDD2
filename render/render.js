import App from '../App.js';

const render = ($container) => {
  $container.innerHTML = new App().domStr();
};

export default render;
