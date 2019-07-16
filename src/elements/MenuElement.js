import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import keyEventDispatcher from '../keyEventDispatcher.js';

export default class MenuElement extends BaseElement {
  static get elementName() {
    return 'menu';
  }

  static get defaultAttributes() {
    return {
      hidden: '',
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: max-content;
      }

      :host([hidden]) {
        display: none;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `;
  }

  constructor() {
    super();

    keyEventDispatcher.observe(this, {
      types: {
        Escape: true,
      },
    });

    this.addEventListener('annex-key', event => {

    });
  }

  render() {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `;
  }

  focus() {
    this.querySelector('annex-menu-item').focus();
  }

  close() {
    this.dispatchEvent(new CustomEvent('annex-close', {
      bubbles: true,
    }));
  }
}
