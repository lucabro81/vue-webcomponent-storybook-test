import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import HelloWorld from './App.vue'

const WrappedElement = wrap(Vue, HelloWorld);
window.customElements.define('hello-world', WrappedElement);
