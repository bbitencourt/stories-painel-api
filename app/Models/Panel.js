'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Panel extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'PanelHook.sendWs')
  }
}

module.exports = Panel
