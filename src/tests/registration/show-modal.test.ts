/**
 * @jest-environment jsdom
 */

import 'bootstrap';
import showModal from '../../shared/modal/modal-window';

describe('showModal', () => {
  afterEach(() => document.body.replaceChildren());

  it('Should show modal window', () => {
    const { body } = document;

    showModal(true, 'created');

    expect(body.firstElementChild).toBeInstanceOf(HTMLDivElement);
  });

  it('Should provide required style on success', () => {
    const { body } = document;

    showModal(true, 'created');

    expect(body.firstElementChild?.classList.contains('alert-success')).toBe(true);
  });

  it('Should provide required style on fail', () => {
    const { body } = document;

    showModal(false, 'Registration');

    expect(body.firstElementChild?.classList.contains('alert-danger')).toBe(true);
  });

  it('Should provide error message', () => {
    const { body } = document;

    showModal(false, 'Registration', 'Error message');

    expect(body.querySelector('div.row>:nth-of-type(2)')?.textContent).toBe('Error message');
  });

  it('Should close modal on click at close button', async () => {
    const { body } = document;
    const clickEvent = new Event('click');
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 100);
    });

    showModal(false, 'Registration', 'Error message');
    body.querySelector('.btn-close')?.dispatchEvent(clickEvent);

    await promise;
    expect(body.childElementCount).toBe(0);
  });
});
