import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import idRegistry from '../idRegistry.js';

export default class InstructionsElement extends BaseElement {
  static get elementName() {
    return 'instructions';
  }

  static get defaultAttributes() {
    return {
      id: () => idRegistry.generate(),
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 0.8em;
        font-style: italic;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
