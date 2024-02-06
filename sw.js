self.addEventListener('message', (ev) => {
  let clientid = ev.source.id;
  if ('fname' in ev.data) {
    sendMessage(ev.data.fname, clientid);
  }
});

function sendMessage(name, clientid) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      if (client.id !== clientid) {
        client.postMessage({ fname: name });
      }
    });
  });
}
