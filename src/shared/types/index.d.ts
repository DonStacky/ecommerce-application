declare global {
  interface HTMLElementEventMap {
    successUpdateCart: CustomEvent<Cart>;
  }
}
export {};
