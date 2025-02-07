import { Listener } from '@sapphire/framework';
import { TextChannel } from 'discord.js';

export class MessageForwarderListener extends Listener {
    constructor(context, options) {
        super(context, { ...options, event: 'messageCreate' });
    }

    async run(message) {
        // IDs for servers, channels, and user
        const EAST_SERVER_ID = '647972389459853313'; // Updated server ID for testing
        const EAST_USER_ID = '575818331563622424'; // Updated user ID for testing
        const ANNOUNCEMENTS_CHANNEL_ID = '1135639634282553487'; // Updated channel ID for testing

        const ECC_SERVER_ID = '1166884117804224572'; // ECC server remains the same
        const EAST_ANNOUNCEMENT_CHANNEL_ID = '1336743844003315764'; // ECC east-announcement channel remains the same

        // Ensure message is from correct server, user, and channel
        if (
            message.guild?.id !== EAST_SERVER_ID || 
            message.channel.id !== ANNOUNCEMENTS_CHANNEL_ID || 
            message.author.id !== EAST_USER_ID
        ) return;


        // Get the target ECC server and channel
        const eccGuild = this.container.client.guilds.cache.get(ECC_SERVER_ID);
        if (!eccGuild) return console.error('ECC Server not found!');

        const announcementChannel = eccGuild.channels.cache.get(EAST_ANNOUNCEMENT_CHANNEL_ID);
        if (!announcementChannel || !(announcementChannel instanceof TextChannel)) return console.error('East-announcement channel not found!');

        // Forward the message
        await announcementChannel.send(`📢 **New Announcement from WSU College of EAST:**\n${message.content}`);

        // Log for debugging
        console.log(`Forwarded message from ${message.author.username}: ${message.content}`);
    }
}