import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class DropdownMenuElement extends BaseElement {
  render() {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}
