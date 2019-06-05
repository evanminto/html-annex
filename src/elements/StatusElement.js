import { html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class StatusElement extends BaseElement {
  static get elementName() {
    return 'status';
  }

  static get properties() {
    return {
      message: {
        type: String,
      },
      for: {
        type: String,
      },
    };
  }

  get for() {
  }

  set for(value) {
    if (typeof value === 'string') {
      this._for = value;
    } else if ('length' in value) {
      // this._for =
    }
  }

  render() {
    return html`<output>${this.message}</output>`;
  }
}
