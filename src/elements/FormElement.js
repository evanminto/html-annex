import { html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class FormElement extends BaseElement {
  static get elementName() {
    return 'form';
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('submit', event => {
      event.preventDefault();

      const form = event.target;

      this.dispatchEvent(new CustomEvent('annex-submit', {
        bubbles: true,
        detail: {
          data: new FormData(event.target),
        },
      }));

      const result = this.dispatchEvent(new CustomEvent('annex-validate', {
        bubbles: true,
        cancelable: true,
      }));

      if (result) {
        form.checkValidity();

        const existingStatuses = Array.from(this.querySelectorAll('annex-status'));

        if (existingStatuses.length) {
          existingStatuses.forEach(el => el.remove());
        }

        Array.from(form.elements).forEach(el => {
          if (!el.validity.valid) {
            this.showInputError(el, el.validationMessage);
          }
        });
      }
    });
  }

  showFormError(message) {
    const status = document.createElement('annex-status');
    status.message = message;
    this.querySelector('form').prepend(status);
  }

  showInputError(input, message) {
    const status = document.createElement('annex-status');
    status.message = message;
    status.id = 'error';
    input.parentNode.insertBefore(status, input.nextSibling);
    input.setAttribute('aria-describedby', status.id);
  }

  render() {
    return html`<slot></slot>`;
  }
}
