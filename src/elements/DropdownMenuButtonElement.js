import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class DropdownMenuButtonElement extends BaseElement {
  static get properties() {
    return {
      for: {
        type: String,
        attribute: true,
      },
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
