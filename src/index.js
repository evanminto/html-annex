import TabsElement from './elements/TabsElement.js';
import TabListElement from './elements/TabListElement.js';
import TabElement from './elements/TabElement.js';
import TabPanelElement from './elements/TabPanelElement.js';
import AccordionElement from './elements/AccordionElement.js';
import InstructionsElement from './elements/InstructionsElement.js';
import FormElement from './elements/FormElement.js';
import StatusElement from './elements/StatusElement.js';
import MenuElement from './elements/MenuElement.js';
import MenuItemElement from './elements/MenuItemElement.js';
import MenuButtonElement from './elements/MenuButtonElement.js';

const elements = [
  TabsElement,
  TabListElement,
  TabElement,
  TabPanelElement,
  AccordionElement,
  InstructionsElement,
  FormElement,
  StatusElement,
  MenuElement,
  MenuItemElement,
  MenuButtonElement,
];

const HTMLAnnex = {
  defineAll() {
    elements.forEach(el => el.define());
  },
};

elements.forEach(el => {
  HTMLAnnex[el.name] = el;
});

export {
  TabsElement,
  TabListElement,
  TabElement,
  TabPanelElement,
  AccordionElement,
  InstructionsElement,
  FormElement,
  StatusElement,
  MenuElement,
  MenuItemElement,
  MenuButtonElement,
};

export default HTMLAnnex;
