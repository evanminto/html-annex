import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class QuantitySelectorElement extends BaseElement {
  static get elementName() {
    return 'quantity-selector';
  }

  static get styles() {
    return css`
    ::slotted(input) {
      text-align: center;
    }
    `;
  }

  get value() {
    return parseInt(this.querySelector('input').value);
  }

  set value(value) {
    this.querySelector('input').value = value;
  }

  get min() {
    return parseInt(this.querySelector('input').min);
  }

  get max() {
    return parseInt(this.querySelector('input').max);
  }

  get step() {
    return parseInt(this.querySelector('input').step || 1);
  }

  get atMin() {
    return this.value - this.step < this.min;
  }

  get atMax() {
    return this.value + this.step > this.max;
  }

  constructor() {
    super();

    this.addEventListener('input', event => {
      this.requestUpdate();
    });
  }

  decrement() {
    if (!this.atMin) {
      this.value -= this.step;
    }
    this.requestUpdate();
  }

  increment() {
    if (!this.atMax) {
      this.value += this.step;
    }
    this.requestUpdate();
  }

  render() {
    return html`
    <button type="button" @click="${this.decrement}" ?disabled="${this.atMin}">-</button>
    <slot></slot>
    <button type="button" @click="${this.increment}" ?disabled="${this.atMax}">+</button>
    `;
  }
}
