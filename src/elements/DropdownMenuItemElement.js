import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class DropdownMenuItemElement extends BaseElement {
  render() {
    return html`
      <li>
        <slot></slot>
      </li>
    `;
  }
}
