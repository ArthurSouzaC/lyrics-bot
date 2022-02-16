import axios from 'axios';
import config from '../config.js';

// Get artist and song title from command message string
const generateSearchQuery = (msg) => {
  try {
    const searchMessage = msg.content.replace('&letra', '');
    const splittedMessage = searchMessage.split('/');
    const artist = splittedMessage[0];
    const song = splittedMessage[1];
  
    return {
      artist,
      song
    }
  } catch(err) {
    console.error(`Bad query string. Given: ${msg.content}`);
  }
}

// Generate the URL to make the request
const getRequestUrl = (artist, song) => {
  return `${config.vagalumeApiBaseUrl}?apikey=${config.apiKey}&art=${encodeURI(artist)}&mus=${encodeURI(song)}`;
}

// Get the lyrics of the song given an artist and song title
export const getLyrics = async (msg) => {
    const { artist, song } = generateSearchQuery(msg);
    const requestUrl = getRequestUrl(artist, song);
    const response = await axios.get(requestUrl);

    try {
      const lyrics = response.data.mus[0].text;

      if(lyrics.length > 2000) {
				for(let i = 0; i < Math.floor(lyrics.length) / 2000; i++){
					msg.channel.send(lyrics.substring(i * 2000, (i * 2000) + 2000));
				}
			} else {
				msg.channel.send(lyrics);
			}
    }catch(err) {
      msg.channel.send('Ocorreu um erro ao executar o comando! Verifique a sintaxe.');
      console.error(`Something went wrong at Vagalume API request. Error: ${err}`);
    }
}