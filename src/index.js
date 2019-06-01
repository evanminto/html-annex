import TabsElement from './elements/TabsElement.js';
import TabListElement from './elements/TabListElement.js';
import TabElement from './elements/TabElement.js';
import TabPanelElement from './elements/TabPanelElement.js';
import AccordionElement from './elements/AccordionElement.js';
import InstructionsElement from './elements/InstructionsElement.js';

const ProgressiveWebComponents = {
  defaultCustomElementsMap: {
    'pwc-tabs': TabsElement,
    'pwc-tab-list': TabListElement,
    'pwc-tab': TabElement,
    'pwc-tab-panel': TabPanelElement,
    'pwc-accordion': AccordionElement,
    'pwc-instructions': InstructionsElement,
  },

  initialize(customElementNameMap = {}) {
    if ('customElements' in window) {
      const map = Object.assign({}, customElementNameMap, this.defaultCustomElementsMap);
      Object.keys(map).forEach(name => {
        customElements.define(name, map[name]);
      });
    }
  },

  renameElement(oldName, newName) {
    const value = this.defaultCustomElementsMap[oldName];
    this.defaultCustomElementsMap.delete(oldName);
    this.defaultCustomElementsMap[newName] = value;
  }
};

ProgressiveWebComponents.Tabs = TabsElement;
ProgressiveWebComponents.TabList = TabListElement;
ProgressiveWebComponents.Tab = TabElement;
ProgressiveWebComponents.TabPanel = TabPanelElement;
ProgressiveWebComponents.Accordion = AccordionElement;
ProgressiveWebComponents.Instructions = InstructionsElement;

export default ProgressiveWebComponents;
