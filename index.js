import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const token = process.env.DISCORD_TOKEN;


// Initialize bot client
const client = new SapphireClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Load listeners automatically
client.login(token).then(() => {
    console.log(`${client.user.tag} is online and ready!`);
});
