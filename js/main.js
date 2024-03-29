(() => {
  //on load
  //register sw
  navigator.serviceWorker.register('./sw.js');
  //listen for messages from sw
  navigator.serviceWorker.addEventListener('message', receiveMessage);
  //listen for click to send message
  document.querySelector('header').addEventListener('click', sendMessage);
})();

function sendMessage() {
  let functions = ['steve', 'tony', 'tim'];
  navigator.serviceWorker.ready.then((reg) => {
    let name = functions[Math.floor(Math.random() * functions.length)];
    reg.active.postMessage({ fname: name });
  });
}
function receiveMessage(ev) {
  let msg = ev.data;
  if ('fname' in msg && 'cls' in msg) {
    if (typeof eval(msg['fname']) === 'function') {
      eval(msg['fname'])(msg['cls']);
    }
  }
}

function steve(cls) {
  let p = document.querySelector('main').lastElementChild;
  p.className = cls ? cls : 'red';
  p.textContent = 'JavaScript';
}
function tony(cls) {
  let p = document.querySelector('main').lastElementChild;
  p.className = cls ? cls : 'green';
  p.textContent = 'Increment C';
}
function tim(cls) {
  let p = document.querySelector('main').lastElementChild;
  p.className = cls ? cls : 'blue';
  p.textContent = 'Node & Express';
}
