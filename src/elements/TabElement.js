import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class TabElement extends BaseElement {
  static get elementName() {
    return 'tab';
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        reflect: true,
      },

      describedById: {
        type: String,
      },
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
      text-align: var(--text-align, center);
    }

    ::slotted(a) {
      border: 0.0625rem solid transparent;
      border-bottom: 0;
      color: inherit;
      cursor: var(--link-cursor, default);
      display: block;
      padding: 0.25em 0.5em;
      position: relative;
      text-decoration: none;
      top: 0.0625rem;
    }

    :host([selected]) ::slotted(a) {
      border-color: currentColor;
    }
    `;
  }

  get useLinks() {
    const tabs = this.closest('annex-tabs');

    return tabs && tabs.matches('[use-links]');
  }

  get link() {
    return this.querySelector('a');
  }

  get panel() {
    const link = this.link;

    if (link) {
      const id = new URL(link.href).hash.substring(1);

      if (id) {
        return document.getElementById(id);
      }
    }
  }

  focus() {
    this.querySelector('a').focus();
  }

  setup() {
    const a = this.link;

    if (a) {
      if (this.useLinks) {
        a.removeAttribute('role');
        a.removeAttribute('tabindex');
        a.removeAttribute('aria-controls');
      } else {
        a.setAttribute('role', 'tab');
        if (this.selected) {
          a.tabIndex = 0;
        } else {
          a.tabIndex = -1;
        }

        const panel = this.panel;

        if (panel) {
          a.setAttribute('aria-controls', panel.id);
        }
      }

      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', event => {
      if (event.target.matches('a')) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('tab-click', {
          bubbles: true,
        }));
      }
    });

    this.addEventListener('focusin', () => {
      this.dispatchEvent(new CustomEvent('tab-focusin', {
        bubbles: true,
      }));
    });

    this.addEventListener('focusout', () => {
      this.dispatchEvent(new CustomEvent('tab-focusout', {
        bubbles: true,
      }));
    });
  }

  updated() {
    const a = this.querySelector('a');

    if (a) {
      if (!this.useLinks) {
        if (this.selected) {
          a.tabIndex = 0;
        } else {
          a.tabIndex = -1;
        }
      }

      if (this.describedById) {
        a.setAttribute('aria-describedby', this.describedById);
      } else {
        a.removeAttribute('aria-describedby');
      }
    }
  }

  render() {
    return html`
      <span class="wrapper" style="--link-cursor: ${this.useLinks ? 'pointer': 'default'}">
        <slot></slot>
      </span>
    `;
  }
}
