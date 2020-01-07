'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PanelSchema extends Schema {
  up () {
    this.create('panels', table => {
      table.increments()
      table.bigInteger('id_instagram').notNullable()
      table.string('media_type').notNullable()
      table.string('media_url').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('panels')
  }
}

module.exports = PanelSchema
