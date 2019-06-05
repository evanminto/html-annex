import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class TabsElement extends BaseElement {
  static get elementName() {
    return 'tabs';
  }

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

    :host([orientation='vertical']) ::slotted(annex-tab-panel) {
      flex-basis: 100%;
    }

    :host([orientation='vertical']) ::slotted(annex-tab-list) {
      --tab-direction: column;
      --text-align: left;
    }

    ::slotted(annex-instructions) {
      display: block;
      visibility: visible;
    }

    ::slotted(annex-instructions[hidden]) {
      display: block;
      visibility: hidden;
    }

    :host([use-links]) ::slotted(annex-instructions) {
      display: none;
    }
    `;
  }

  get tabList() {
    return this.querySelector('annex-tab-list');
  }

  get tabs() {
    const tabList = this.tabList;

    if (tabList) {
      return tabList.querySelectorAll('annex-tab');
    }

    return [];
  }

  get instructions() {
    return this.querySelector('annex-instructions');
  }

  get panels() {
    return this.querySelectorAll('annex-tab-panel');
  }

  get selectedTab() {
    return this.tabs[this.index];
  }

  set selectedTab(tab) {
    this.index = Array.from(tab.closest('annex-tab-list').querySelectorAll('annex-tab')).indexOf(tab);
  }

  get selectedPanel() {
    return this.panels[this.index];
  }

  set selectedPanel(panel) {
    this.index = Array.from(this.querySelectorAll('annex-tab-panel')).indexOf(panel);
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

    this.addEventListener('annex-key-inactive', event => {
      if (!this.hasAttribute('use-links')) {
        this.instructions.hidden = true;
      }
    });

    this.addEventListener('annex-key-active', event => {
      if (!this.hasAttribute('use-links')) {
        this.instructions.hidden = false;
      }
    });
  }

  setup() {
    super.setup();

    const tab = this.selectedTab;

    if (this.instructions) {
      customElements.whenDefined('annex-instructions').then(() => {
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
          customElements.whenDefined('annex-instructions').then(() => {
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
