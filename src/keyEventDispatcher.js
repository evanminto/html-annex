import KeyboardObserver from '@evanminto/keyboard-observer';

function getActiveElement() {
  let el = document.activeElement;

  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }

  return el;
}

function matchEvent(event, typeMap) {
  const keys = Object.keys(typeMap);

  for (let i = 0; i < keys.length; i++) {
    const type = keys[i];
    const def = typeMap[type];
    const response = {
      type,
      preventDefault: def.preventDefault,
    };

    if (typeof def === 'string') {
      if (event.key === def) {
        return response;
      }
    } else if (def === true) {
      if (event.key === type) {
        return response;
      }
    } else {
      const key = (def.key === undefined || event.key === def.key);
      const alt = (def.altKey === undefined || event.altKey === def.altKey);
      const ctrl = (def.ctrlKey === undefined || event.ctrlKey === def.ctrlKey);
      const meta = (def.metaKey === undefined || event.metaKey === def.metaKey);
      const shift = (def.shiftKey === undefined || event.shiftKey === def.shiftKey);

      if (key && alt && ctrl && meta && shift) {
        return response;
      }
    }
  }
}

class ObservedItem {
  constructor(element, typeMap, filter) {
    this.element = element;
    this.typeMap = typeMap;
    this.filter = filter;
  }

  matchElement(el) {
    if (this.filter) {
      return el.matches(this.filter);
    }

    return true;
  }

  matchEvent(event) {
    return matchEvent(event, this.typeMap);
  }
}

export class KeyEventDispatcher {
  constructor() {
    this.observedItems = [];
    this.observing = false;
    this.activeObservedItem = undefined;
  }

  addItem(item) {
    this.observedItems.push(item);
  }

  observe(oneOrManyEls, { types = {}, filter = '' }) {
    const elementsArr = [].concat(oneOrManyEls);

    const observer = new KeyboardObserver(results => {
      results.forEach(({ event, target }) => {
        const activeEl = getActiveElement();

        if (filter && (!activeEl || !activeEl.matches(filter))) {
          return;
        }

        const typeData = matchEvent(event, types);

        if (typeData) {
          const keyEvent = new CustomEvent('annex-key', {
            bubbles: true,
            cancelable: true,
            detail: {
              type: typeData.type,
            },
          });

          target.dispatchEvent(keyEvent);

          if (keyEvent.defaultPrevented) {
            event.preventDefault();
          }
        }
      });
    });

    elementsArr.forEach(el => {
      observer.observe(el);
      this.addItem(new ObservedItem(el, types, filter));
    });

    if (!this.observing) {
      this.startObserving();
    }
  }

  startObserving() {
    document.body.addEventListener('focusout', event => {
      event.composedPath().forEach((el => {
        if (this.activeObservedItem && el === this.activeObservedItem.element) {
          this.activeObservedItem.element.dispatchEvent(new CustomEvent('annex-key-inactive', {
            bubbles: true,
          }));

          this.activeObservedItem = undefined;
        }
      }));
    });

    document.body.addEventListener('focusin', event => {
      const path = event.composedPath();
      const filteredObservedItems = this.observedItems.filter(
        item => item.matchElement(event.target)
      );
      let item;

      for (let i = 0; i < path.length; i++) {
        const el = path[i];
        const matches = filteredObservedItems.filter(i => i.element === el);

        if (matches.length > 0) {
          item = matches[0];
          break;
        }
      }

      if (item) {
        this.activeObservedItem = item;

        this.activeObservedItem.element.dispatchEvent(new CustomEvent('annex-key-active', {
          bubbles: true,
        }));
      } else {
        this.activeObservedItem = undefined;
      }
    });

    this.observing = true;
  }
}

export default new KeyEventDispatcher();
