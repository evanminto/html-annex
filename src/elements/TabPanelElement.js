import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class TabPanelElement extends BaseElement {
  static get elementName() {
    return 'tab-panel';
  }

  static get defaultRole() {
    return 'tabpanel';
  }

  static get defaultTabIndex() {
    return 0;
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
    :host {
      border: 0.0625rem solid;
      display: none;
      padding: 0.5em;
    }

    :host([selected]) {
      display: block;
    }
    `;
  }

  get useLinks() {
    const tabs = this.closest('annex-tabs');

    return tabs && tabs.matches('[use-links]');
  }

  setup() {
    if (this.useLinks) {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
      this.removeAttribute('aria-selected');
    }
  }

  updated() {
    if (!this.useLinks) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
