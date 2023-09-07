import { CreateOptions } from '../types/types';

// Создает HTML элемент
export function createElement<T extends keyof HTMLElementTagNameMap>(
  createOptions: CreateOptions<T>
): HTMLElementTagNameMap[T] {
  const element = document.createElement(createOptions.tagname);
  if (createOptions.options) {
    createOptions.options.forEach(([prop, value]) => {
      element[prop] = value;
    });
  }
  if (createOptions.childElements) {
    element.append(...createOptions.childElements);
  }
  if (createOptions.events) {
    createOptions.events.forEach(([eType, fun]) => {
      element.addEventListener(eType, fun);
    });
  }
  return element;
}

export function createElementBase<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  classNameArrow?: string[],
  id?: string,
  text?: string
) {
  const ELEM = document.createElement(tag);
  if (classNameArrow) {
    ELEM.classList.add(...classNameArrow);
  }
  if (id) {
    ELEM.setAttribute('id', id);
  }
  if (text) {
    ELEM.innerText = text;
  }
  return ELEM;
}

// Находит элемент в дереве DOM или выбрасывает ошибку, если такого элемента нет
export function findDomElement<T extends keyof HTMLElementTagNameMap>(parentElement: HTMLElement, selector: string) {
  const element = parentElement.querySelector<HTMLElementTagNameMap[T]>(selector);
  if (element !== null) return element;
  throw new Error(`Selector ${selector} didn't match any elements`);
}
