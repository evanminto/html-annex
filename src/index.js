import TabsElement from './elements/TabsElement.js';
import TabListElement from './elements/TabListElement.js';
import TabElement from './elements/TabElement.js';
import TabPanelElement from './elements/TabPanelElement.js';
import AccordionElement from './elements/AccordionElement.js';
import InstructionsElement from './elements/InstructionsElement.js';
import FormElement from './elements/FormElement.js';
import StatusElement from './elements/StatusElement.js';

const elements = [
  TabsElement,
  TabListElement,
  TabElement,
  TabPanelElement,
  AccordionElement,
  InstructionsElement,
  FormElement,
  StatusElement,
]

const HTMLAnnex = {
  defineAll() {
    elements.forEach(el => el.define());
  },
};

elements.forEach(el => {
  HTMLAnnex[el.name] = el;
});

export default HTMLAnnex;
