import dotenv from 'dotenv';

dotenv.config();

// Exporting environment variables
export default {
  port: process.env.PORT,
  discordBotToken: process.env.DISCORD_BOK_TOKEN,
  vagalumeApiBaseUrl: 'https://api.vagalume.com.br/search.php',
  vagalumeApiKey: process.env.VAGALUME_API_KEY,
}