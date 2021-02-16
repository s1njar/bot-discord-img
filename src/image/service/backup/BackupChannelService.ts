import {Channel, Message} from "discord.js";
import {SaveImageService} from "../image/SaveImageService";
import {Inject} from "typescript-ioc";
import * as fetchMessages from "discord-fetch-all";

/**
 * @class BackupChannelService
 */
export class BackupChannelService {

    @Inject
    private saveImageService: SaveImageService

    /**
     * Executes backup of images.
     *
     * @param channel
     * @param message
     */
    public async execute(channel: Channel, message: Message): Promise<void> {
        // @ts-ignore
        const messages = await fetchMessages.messages(channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });

        new Promise((resolve) => {
            messages.forEach(async (channelMessage, index) => {
                await setTimeout(async () => {
                    await this.saveImageService.execute(channelMessage, true);
                    if (index === messages.length -1) resolve();
                },index * 100);
            });
        }).then(() => {
            // @ts-ignore
            return message.channel.send(`Successfully created backup of "${channel.name}".`);
        });
    }
}