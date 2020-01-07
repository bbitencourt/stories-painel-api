'use strict';

const Ws = use('Ws')

const PanelHook = (exports = module.exports = {})

PanelHook.method = async modelInstance => {}

PanelHook.sendWs = async () => {
  const topic = Ws.getChannel('panel').topic('panel')
  if (topic) {
    topic.broadcast('new')
  }
}
