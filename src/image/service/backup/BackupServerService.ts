import {GuildChannel, Message} from "discord.js";
import {Inject} from "typescript-ioc";
import {BackupChannelService} from "./BackupChannelService";

/**
 * @class BackupServerService
 */
export class BackupServerService {
    @Inject
    private backupChannelService: BackupChannelService

    /**
     * Execute backup of server images.
     *
     * @param message
     * @param categories
     */
    public async execute(message: Message, categories: string[]) {
        const channels = message.guild.channels;
        let channel: GuildChannel;
        message.channel.send('🎌 Started server backup.').then();

        for (channel of channels.cache.array()) {
            if (channel.parent && categories.includes(channel.parent.name)) {
                await this.backupChannelService.execute(channel, message);
            }
        }

        message.channel.send('✅ Finished server backup.').then();
    }
}