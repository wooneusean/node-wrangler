/**
 * @typedef {Object} Socket
 * @property {string} label
 * @property {any} value
 * @property {'input' | 'output'} type
 *
 * @typedef {(sockets: Socket[]) => void} WranglerNodeOperation
 */

import EventEmitter from './EventEmitter';

/**
 * @class
 * @augments EventEmitter
 */
export default class WranglerNode extends EventEmitter {
  /** @type {string} */
  label;
  /** @type {Socket[]} */
  sockets;
  /** @type {WranglerNodeOperation} */
  operation;

  /**
   *
   * @param {WranglerNodeOperation} operation
   * @param  {Socket[]} sockets
   */
  constructor(label, operation, ...sockets) {
    super();

    this.label = label;
    this.operation = operation;
    this.sockets = sockets;
  }

  /**
   *
   * @param {'connect' | 'disconnect'} event
   * @param {any} data
   * @override
   */
  emit(event, data) {
    super.emit(event, data);
  }
}
