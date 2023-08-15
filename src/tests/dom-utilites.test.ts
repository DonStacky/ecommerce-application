/**
 * @jest-environment jsdom
 */

import { createElement } from '../shared/helpers/dom-utilites';
import { CreateOptions } from '../shared/types/types';

describe('createElement', () => {
  it('Should create element with a provided options', () => {
    const options: CreateOptions<keyof HTMLElementTagNameMap> = {
      tagname: 'div',
      childElements: [createElement({ tagname: 'span', options: [['textContent', 'another text']] })],
      options: [
        ['textContent', 'text'],
        ['className', 'class-selector'],
      ],
    };
    const element = createElement(options);

    const compareElement = document.createElement('div');
    const insertedElement = document.createElement('span');
    insertedElement.textContent = 'another text';
    compareElement.textContent = 'text';

    compareElement.append(insertedElement);
    compareElement.className = 'class-selector';
    expect(element).toEqual(compareElement);
  });

  it('Should add provided events', async () => {
    const eventFun = jest.fn();
    const options: CreateOptions<keyof HTMLElementTagNameMap> = {
      tagname: 'div',
      events: [['click', eventFun]],
    };
    const element = createElement(options);
    const event = new Event('click');
    element.dispatchEvent(event);
    expect(eventFun).toBeCalled();
  });
});
