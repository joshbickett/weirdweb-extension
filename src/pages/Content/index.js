console.log('page loaded');

export const changeAnchor = (element) => {
  console.log('element: ', element);
  const children = element?.children;

  console.log('___');
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      changeAnchor(children[i]);
    }
  }
  // disable the anchor tag
  if (element.nodeName === 'A') {
    console.log('disabling anchor tag', element);

    element.addEventListener('click', (e) => {
      e.preventDefault();
      element.textContent = 'hello!!';
    });
  }
};

setTimeout(() => {
  console.log('changing anchor tags');
  changeAnchor(document.body);
}, 1000);
