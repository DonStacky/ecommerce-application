export interface CreateOptions<T extends keyof HTMLElementTagNameMap> {
  tagname: T;
  childElements?: (HTMLElement | SVGElement)[];
  options?: ElementOptions<HTMLElementTagNameMap[T]>;
  events?: [keyof HTMLElementEventMap, EventListenerOrEventListenerObject][];
}

export type ElementOptions<T> = [keyof T, T[keyof T]][];
