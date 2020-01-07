'use strict';

const Panel = use('App/Models/Panel')
const axios = require('axios')

class PanelController {
  async index () {
    const data = await Panel.query()
      .orderBy('id', 'desc')
      .limit(30)
      .fetch()
    return data
  }

  async store ({ response }) {
    const token =
      'EAAkzOYTNVOMBADLpLG7VEMwZBbmVJ2vzFIUZBvJXpKMv2gEQR06ZC1gcJt3KLSxizkYk0qZBX0ZBBvtHeObqTqBbvMA1snMia62wJj2q2LjyaZC3H4SlK9rmSeOZBANQbWGGtbCns5rDN3ZBgCD7ptW4GRXkrHDLPSgHdOQpcwwuEiS3A2WKxBy2';
    const apiUrl = 'https://graph.facebook.com/v5.0';

    try {
      const resp = await axios.get(
        `${apiUrl}/17841407231270389/stories?access_token=${token}`,
        {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      if (resp.status === 200) {
        const { data } = resp.data

        if (data.length) {
          await Promise.all(
            data.map(async i => {
              // const hasStory = await Panel.findBy('id_instagram', i.id)
              // console.log('hasStory', hasStory)
              const media = await axios.get(
                `${apiUrl}/${i.id}/?fields=id,media_type,media_url&access_token=${token}`,
                {
                  headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  }
                }
              )
              if (media.status === 200) {
                const { id, media_type, media_url } = media.data
                const saveData = {
                  id_instagram: id,
                  media_type,
                  media_url
                }

                await Panel.findOrCreate({ id_instagram: id }, saveData)
              }
            })
          )
        }
        return response
          .status(200)
          .send({ success: { message: 'Stories proccess Ok' } })
      }
      return response.send({ error: { message: 'Ops, algo deu errado' } })
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Ops, algo deu errado' } })
    }
  }
}

module.exports = PanelController
