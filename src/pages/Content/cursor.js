const followCursor = (cursor) => {
  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
    var eventDoc, doc, body;
    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }

    console.log(event.pageY, event.pageX);

    cursor.style.left = event.pageX + 'px';
    cursor.style.top = event.pageY + 'px';
  }
};

export const startCursor = () => {
  document.body.style.cursor = 'none';

  let cursor = document.getElementById('follow-me');
  followCursor(cursor);
};
