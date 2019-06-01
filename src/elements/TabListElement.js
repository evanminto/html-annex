import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import keyboardObserver from '../keyboardObserver.js';

export default class TabListElement extends BaseElement {
  static get defaultRole() {
    return 'tablist';
  }

  static get styles() {
    return css`
    :host {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      text-align: center;
    }

    ::slotted(ul) {
      list-style: none;
      display: flex;
      flex-direction: var(--tab-direction, row);
      margin: 0;
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0;
    }
    `;
  }

  get useLinks() {
    const tabs = this.closest('pwc-tabs');

    return tabs && tabs.matches('[use-links]');
  }

  get orientation() {
    const tabs = this.closest('pwc-tabs');

    return tabs.orientation;
  }

  constructor() {
    super();

    keyboardObserver.observe(this, {
      ArrowRight: true,
      ArrowLeft: true,
      ArrowDown: true,
      ArrowUp: true,
      Home: true,
      End: true,
    });

    this.addEventListener('pwc-key', event => {
      if (!this.useLinks) {
        if (event.detail.type === 'ArrowRight') {
          if (this.orientation !== 'vertical') {
            event.preventDefault();

            this.dispatchEvent(new CustomEvent('tab-move-next', {
              bubbles: true,
            }));
          }
        }

        if (event.detail.type === 'ArrowLeft') {
          if (this.orientation !== 'vertical') {
            event.preventDefault();

            this.dispatchEvent(new CustomEvent('tab-move-previous', {
              bubbles: true,
            }));
          }
        }

        if (event.detail.type === 'ArrowDown') {
          if (this.orientation === 'vertical') {
            event.preventDefault();

            this.dispatchEvent(new CustomEvent('tab-move-next', {
              bubbles: true,
            }));
          }
        }

        if (event.detail.type === 'ArrowUp') {
          if (this.orientation === 'vertical') {
            event.preventDefault();

            this.dispatchEvent(new CustomEvent('tab-move-previous', {
              bubbles: true,
            }));
          }
        }

        if (event.detail.type === 'Home') {
          event.preventDefault();

          this.dispatchEvent(new CustomEvent('tab-move-start', {
            bubbles: true,
          }));
        }

        if (event.detail.type === 'End') {
          event.preventDefault();

          this.dispatchEvent(new CustomEvent('tab-move-end', {
            bubbles: true,
          }));
        }
      }
    });
  }

  setup() {
    if (this.useLinks) {
      this.removeAttribute('role');
    }

    const listEls = this.querySelectorAll('ul, li');

    if (listEls.length > 0) {
      Array.from(listEls).forEach(el => {
        if (this.useLinks) {
          el.removeAttribute('role');
        } else {
          el.setAttribute('role', 'presentation');
        }
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
