export function render(child, parent) {
  const createdChild = createElement(child);
  parent.append(createdChild);
}
export function Style(code) {
  const normalize =
    "*,*::before,*::after{padding:0;margin:0;box-sizing:content-box}";
  render({ tag: "style", children: normalize + code }, document.body);
}
export function createElement({ tag = "", props = {}, children = [] }) {
  if (!tag) {
    return document.createTextNode(children);
  } else {
    const element =
      tag === "</>"
        ? document.createDocumentFragment()
        : document.createElement(tag);
    if (props)
      for (const prop in props) {
        if (typeof props[prop] === "function") {
          const event = prop.replace("on", "");
          tag === "</>"
            ? $app.addEventListener(event, (e) => props[prop](e))
            : element.addEventListener(event, (e) => props[prop](e));
        } else {
          let inserted = false;
          for (const style in element.style) {
            if (prop === style) {
              inserted = true;
              element.style[prop] = props[prop];
              break;
            }
          }
          if (!inserted) element.setAttribute(prop, props[prop]);
        }
      }
    if (children)
      if (typeof children === "string") {
        const child = createElement({ children });
        element.append(child);
      } else {
        for (const child of children) {
          const elementChild = createElement(child);
          element.append(elementChild);
        }
      }
    return element;
  }
}
