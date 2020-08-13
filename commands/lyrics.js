import https from 'https'

export default {
    name: '&letra',
    description: 'Procura a letra de uma música na API do Vagalume',
    execute: async function(msg) {
		msg.content = msg.content.replace('&letra', '')
		const artist = msg.content.split('/')[0]
		const music = msg.content.split('/')[1]

		const url = `https://api.vagalume.com.br/search.php?apikey=${process.env.VAGALUME_API_TOKEN}&art=${encodeURI(artist)}&mus=${encodeURI(music)}`
		
		try {
			var lyrics = await getLyrics(url)
			
			if(lyrics.length > 2000) {
				for(let i = 0; i < Math.floor(lyrics.length)/2000; i++){
					msg.channel.send(lyrics.substring(i * 2000, (i * 2000) + 2000))
				}
			} else {
				msg.channel.send(lyrics)
			}
		} catch (error) {
			msg.channel.send('Ocorreu um erro ao executar o comando! Verifique a sintaxe.')
		}
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
			try {
				resolve(JSON.parse(data).mus[0].text)
			} catch (err) {
				reject(err)
			}
			
		})

		}).on('error', error => {
			reject(error)
		})
	})
}