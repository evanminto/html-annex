import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class TabsElement extends BaseElement {
  static get properties() {
    return {
      orientation: {
        type: String,
        reflect: true,
      },

      useLinks: {
        type: Boolean,
        reflect: true,
        attribute: 'use-links',
      },

      index: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }

    :host([orientation='vertical']) {
      display: flex;
    }

    :host([orientation='vertical']) ::slotted(pwc-tab-panel) {
      flex-basis: 100%;
    }

    :host([orientation='vertical']) ::slotted(pwc-tab-list) {
      --tab-direction: column;
      --text-align: left;
    }

    ::slotted(pwc-instructions) {
      display: block;
      visibility: visible;
    }

    ::slotted(pwc-instructions[hidden]) {
      display: block;
      visibility: hidden;
    }

    :host([use-links]) ::slotted(pwc-instructions) {
      display: none;
    }
    `;
  }

  get tabList() {
    return this.querySelector('pwc-tab-list');
  }

  get tabs() {
    const tabList = this.tabList;

    if (tabList) {
      return tabList.querySelectorAll('pwc-tab');
    }

    return [];
  }

  get instructions() {
    return this.querySelector('pwc-instructions');
  }

  get panels() {
    return this.querySelectorAll('pwc-tab-panel');
  }

  get selectedTab() {
    return this.tabs[this.index];
  }

  set selectedTab(tab) {
    this.index = Array.from(tab.closest('pwc-tab-list').querySelectorAll('pwc-tab')).indexOf(tab);
  }

  get selectedPanel() {
    return this.panels[this.index];
  }

  set selectedPanel(panel) {
    this.index = Array.from(this.querySelectorAll('pwc-tab-panel')).indexOf(panel);
  }

  constructor() {
    super();

    this.orientation = 'horizontal';
    this.initialized = false;
    this.index = 0;

    this.addEventListener('tab-click', event => this.selectedTab = event.target);
    this.addEventListener('tab-move-next', () => this.moveNext());
    this.addEventListener('tab-move-previous', () => this.movePrevious());
    this.addEventListener('tab-move-start', () => this.moveStart());
    this.addEventListener('tab-move-end', () => this.moveEnd());

    this.addEventListener('tab-focusout', event => {
      if (!this.hasAttribute('use-links')) {
        this.instructions.hidden = true;
      }
    });

    this.addEventListener('tab-focusin', event => {
      if (!this.hasAttribute('use-links')) {
        this.instructions.hidden = false;
      }
    });
  }

  setup() {
    super.setup();

    const tab = this.selectedTab;

    if (this.instructions) {
      customElements.whenDefined('pwc-instructions').then(() => {
        tab.describedById = this.instructions.id;
        this.instructions.hidden = true;
      });
    }
  }

  moveNext() {
    const newIndex = this.index + 1;

    if (newIndex >= this.tabs.length) {
      this.index = 0;
    } else {
      this.index = newIndex;
    }
  }

  movePrevious() {
    const newIndex = this.index - 1;

    if (newIndex < 0) {
      this.index = this.tabs.length - 1;
    } else {
      this.index = newIndex;
    }
  }

  moveStart() {
    this.index = 0;
  }

  moveEnd() {
    this.index = this.tabs.length - 1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'use-links':
        const tabList = this.tabList;

        if (tabList) {
          tabList.setup();
        }

        Array.from(this.tabs).forEach((tab, index) => {
          tab.setup();
        });

        Array.from(this.panels).forEach((panel, index) => {
          panel.setup();
        });

        break;

      case 'orientation':
        if (newValue) {
          this.setAttribute('aria-orientation', newValue);
        } else {
          this.removeAttribute('aria-orientation');
        }

        break;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  updated({ index }) {
    if (index !== this.index) {
      this.dispatchEvent(new CustomEvent('tab-change', {
        bubbles: true,
      }));

      Array.from(this.tabs).forEach((tab, index) => {
        tab.selected = (index === this.index);

        tab.describedById = undefined;

        if (this.initialized && tab.selected) {
          tab.focus();
        }

        if (tab.selected && this.instructions) {
          customElements.whenDefined('pwc-instructions').then(() => {
            tab.describedById = this.instructions.id;
          });
        }
      });

      Array.from(this.panels).forEach((panel, index) => {
        panel.selected = (index === this.index);
      });
    }

    this.initialized = true;
  }

  render() {
    return html`<slot></slot>`;
  }
}
