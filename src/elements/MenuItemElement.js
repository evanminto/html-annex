import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class MenuItemElement extends BaseElement {
  static get elementName() {
    return 'menu-item';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ::slotted(a),
      ::slotted(button),
      ::slotted([role='link']),
      ::slotted([role='button']) {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <li>
        <slot></slot>
      </li>
    `;
  }

  focus() {
    const focusable = this.querySelector('a, button, [tabindex]');

    if (focusable) {
      focusable.focus();
    }
  }
}
