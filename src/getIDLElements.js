export default function getIDLElements(el, attribute) {
  const ids = el.getAttribute(attribute).split(/\s+/);

  return ids.map(id => document.getElementById(id)).filter(el => el);
}
