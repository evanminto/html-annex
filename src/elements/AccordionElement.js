import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import keyboardObserver from '../keyboardObserver.js';

export default class AccordionElement extends BaseElement {
  static get elementName() {
    return 'accordion';
  }

  static get properties() {
    return {
      index: Number,
      focusIndex: Number,
      multiple: {
        type: Boolean,
        reflect: true,
      },
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ::slotted(details) {
        border: 0.0625rem solid;
        padding: 0.25rem;
      }

      ::slotted(details:not(:first-of-type)) {
        border-top: 0;
      }

      ::slotted(annex-instructions) {
        visibility: visible;
      }

      ::slotted(annex-instructions[hidden]) {
        display: inline;
        visibility: hidden;
      }
    `;
  }

  get detailsElements() {
    return this.querySelectorAll('details');
  }

  get summaryElements() {
    return this.querySelectorAll('summary');
  }

  get currentPanel() {
    return this.getPanelByIndex(this.index);
  }

  get focusedSummary() {
    return this.summaryElements[this.focusIndex];
  }

  get firstSummary() {
    const summaries = this.summaryElements;

    if (summaries.length > 0) {
      return summaries[0];
    }
  }

  get instructions() {
    return this.querySelector('annex-instructions');
  }

  getPanelByIndex(index) {
    return this.detailsElements[index];
  }

  render() {
    return html`<slot></slot>`;
  }

  updateFocus() {
    const summary = this.focusedSummary || this.firstSummary;

    if (summary) {
      summary.focus();
    }
  }

  setup() {
    super.setup();
    // this.updateFocus();
  }

  connectedCallback() {
    super.connectedCallback();

    this.index = -1;

    keyboardObserver.observe(this, {
      types: {
        ArrowUp: true,
        ArrowDown: true,
        Home: true,
        End: true,
      },
      filter: 'summary',
    });

    this.instructions.hidden = true;

    this.addEventListener('annex-key-active', event => {
      this.instructions.hidden = false;
    });

    this.addEventListener('annex-key-inactive', event => {
      this.instructions.hidden = true;
    });

    this.addEventListener('annex-key', event => {
      if (event.detail.type === 'ArrowDown') {
        event.preventDefault();
        this.moveNext();
      }

      if (event.detail.type === 'ArrowUp') {
        event.preventDefault();
        this.movePrevious();
      }

      if (event.detail.type === 'Home') {
        event.preventDefault();
        this.moveStart();
      }

      if (event.detail.type === 'End') {
        event.preventDefault();
        this.moveEnd();
      }
    });

    this.addEventListener('focusin', event => {
      const index = Array.from(this.summaryElements).indexOf(event.target);

      if (index >= 0) {
        this.focusIndex = index;
      }
    });

    Array.from(this.detailsElements).forEach((details, index) => {
      details.addEventListener('toggle', () => {
        if (details.open) {
          this.index = index;
          this.focusIndex = index;
        } else {
          let anyOpen = false;

          Array.from(this.detailsElements).forEach(details => {
            if (details.open) {
              anyOpen = true;
            }
          });

          if (!anyOpen) {
            this.index = -1;
          }
        }

        this.updateFocus();

        this.dispatchEvent(new CustomEvent('annex-change', {
          bubbles: true,
        }));
      });
    });
  }

  moveNext() {
    const newIndex = this.focusIndex + 1;

    if (newIndex >= this.summaryElements.length) {
      this.focusIndex = 0;
    } else {
      this.focusIndex = newIndex;
    }
    this.updateFocus();
  }

  movePrevious() {
    const newIndex = this.focusIndex - 1;

    if (newIndex < 0) {
      this.focusIndex = this.summaryElements.length - 1;
    } else {
      this.focusIndex = newIndex;
    }
    this.updateFocus();
  }

  moveStart() {
    this.focusIndex = 0;
    this.updateFocus();
  }

  moveEnd() {
    this.focusIndex = this.summaryElements.length - 1;
    this.updateFocus();
  }

  updated() {
    if (!this.multiple) {
      Array.from(this.detailsElements).forEach((details, dIndex) => {
        if (this.index !== dIndex) {
          details.open = false;
        }
      });
    }
  }
}
