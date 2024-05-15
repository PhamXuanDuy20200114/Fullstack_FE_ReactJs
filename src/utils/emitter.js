import EventEmitter from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(0);//unlimited listeners

export default emitter;