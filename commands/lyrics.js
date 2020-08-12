import https from 'https'

export default {
    name: '&letra',
    description: 'Procura a letra de uma música na API do Vagalume',
    execute: async function(msg) {
		console.log(msg.content)
		msg.content = msg.content.replace('&letra', '')
		const artist = msg.content.split('/')[0]
		const music = msg.content.split('/')[1]

		const url = `https://api.vagalume.com.br/search.php?apikey=${process.env.VAGALUME_API_TOKEN}&art=${encodeURI(artist)}&mus=${encodeURI(music)}`
		const lyrics = await getLyrics(url)
        msg.channel.send(lyrics.mus[0].text)
    }
}

function getLyrics(url) {

	return new Promise((resolve, reject) => {
		https.get(url, reponse => {
		let data = ''

		reponse.on('data', chunk => {
			data += chunk
		})

		reponse.on('end', () => {
			resolve(JSON.parse(data))
		})

		}).on('error', error => {
			reject(error)
		})
	})
}