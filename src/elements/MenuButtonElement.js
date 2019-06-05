import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import MenuElement from './MenuElement.js';
import getIDLElements from '../getIDLElements.js';
import logManager from '../logManager.js';

export default class MenuButtonElement extends BaseElement {
  static get elementName() {
    return 'menu-button';
  }

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

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', event => {
      if (!this.querySelector('button, [role="button"]')) {
        logManager.warn('Menu buttons must have a <button> or element with role="button" as a descendant.');
      }

      if (!event.target.matches('button, [role="button"]')) {
        return;
      }

      getIDLElements(this, 'for').forEach(el => {
        if (el instanceof MenuElement || el.matches(MenuElement.elementName)) {
          el.hidden = !el.hidden;

          if (!el.hidden) {
            el.focus();
          }
        }
      });
    });
  }
}
