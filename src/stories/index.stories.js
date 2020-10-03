import App from '../App.vue'
import {text} from "@storybook/addon-knobs";
import {webComponentWrapper, registerElement} from "./utils.js";

registerElement('my-web-component', App);

export default {
  title: 'AppTest'
}

export const VueTest = webComponentWrapper({
  props: {
    msg: [
      ['msg', 'hello world', 'GROUP-ID1'],
      text
    ],
  },
  template: '<my-web-component></my-web-component>'
});