import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';

// Ref: https://stackoverflow.com/a/28210364
export const isRegistered = (name) => {
  return document.createElement(name).constructor !== HTMLElement;
}

export const registerElement = (name, component) => {
  if (!isRegistered(name)) {
    const WrappedComponent = wrap(Vue, component);
    window.customElements.define(name, WrappedComponent);
    return true;
  }
  return false;
}

// Ref: https://stackoverflow.com/a/57702435/1619070
export const encode = str => {
  const buf = [];

  for (let i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }

  return buf.join('');
}

// Ref: https://stackoverflow.com/a/57702435/1619070
export const decode = str => {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const webComponentWrapper = ({props, template}) => {

  const id = generateRandomNumber(0, 10 ** 16);

  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {

      const old = key + 'Old' + id;
      const value = key + 'Value' + id;

      props[old] = null;
      props[value] = () => (props[old] !== null) ? props[old] : props[key][0][1];
    }
  }

  const matches = template.match(/<[a-zA-Z0-9-]*/);
  const position = matches.index + matches[0].length;

  const newTemplate = `${template.slice(0, position)} id="${id}"${template.slice(position)}`;

  return () => {
    setTimeout(() => {

      const root = document.getElementById(id.toString());
      const old = 'Old' + id;
      const value = 'Value' + id;

      for (const key in props) {

        if (Object.prototype.hasOwnProperty.call(props, key) && !key.includes(old) && !key.includes(value)) {

          const knobsParams = props[key][0];
          const knobsFunction = props[key][1];
          const tagElem = props[key][2];

          knobsParams[1] = props[key + value]();
          props[key + old] = knobsFunction(...knobsParams);

          if (tagElem) {
            const elems = root.getElementsByTagName(tagElem)
            elems.forEach((item) => {
              item[key] = props[key + old];
            })
          }
          else {
            root[key] = props[key + old];
          }
        }
      }

    });

    return newTemplate;
  }
}
