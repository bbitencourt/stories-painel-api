'use strict';

const Route = use('Route')

Route.get('facebook', 'PanelController.store')
Route.get('panel', 'PanelController.index')
Route.get('/', ({ request, response }) => {
  return response.status(200).json({
    message: 'API'
  })
})
