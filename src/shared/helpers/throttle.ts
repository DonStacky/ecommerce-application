const throttle = (func: () => void, ms: number) => {
  let locked = false;
  return function fn() {
    if (locked) return;

    locked = true;

    setTimeout(() => {
      func();
      locked = false;
    }, ms);
  };
};

export default throttle;
