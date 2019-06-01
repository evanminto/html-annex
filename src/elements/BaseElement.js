import { LitElement } from 'lit-element';

export default class BaseElement extends LitElement {
  static get defaultRole() {
    return undefined;
  }

  static get defaultTabIndex() {
    return undefined;
  }

  static get defaultAttributes() {
    return {};
  }

  setup() {
    Array.from(this.querySelectorAll('template')).forEach(template => {
      const fragment = document.adoptNode(template.content);
      template.replaceWith(fragment);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setup();
  }

  constructor() {
    super();

    if (this.constructor.defaultRole !== undefined) {
      this.setAttribute('role', this.constructor.defaultRole);
    }

    if (this.constructor.defaultTabIndex !== undefined) {
      this.tabIndex = this.constructor.defaultTabIndex;
    }

    if (this.constructor.defaultAttributes) {
      const keys = Object.keys(this.constructor.defaultAttributes);
      keys.forEach(key => {
        const originalValue = this.constructor.defaultAttributes[key];
        let value = '';

        if (typeof originalValue === 'function') {
          value = originalValue(this);
        } else {
          value = originalValue;
        }

        this.setAttribute(key, value);
      });
    }
  }
}
