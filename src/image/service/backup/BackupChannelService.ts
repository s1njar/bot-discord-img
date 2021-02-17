import {Channel, Message} from "discord.js";
import {SaveImageService} from "../image/SaveImageService";
import {Inject} from "typescript-ioc";
import * as fetchMessages from "discord-fetch-all";
import {logger} from "../../../../app/helper/logger";

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
        message.channel.send(`Started backup of channel ${channel.name} .`).then()
        // @ts-ignore
        const messages = await fetchMessages.messages(channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });
        logger.info("Got messages.")

        new Promise((resolve) => {
            messages.forEach(async (channelMessage, index) => {
                await setTimeout(async () => {
                    await this.saveImageService.execute(channelMessage);
                    if (index === messages.length -1) resolve();
                },index * 50);
            });
        }).then(() => {
            // @ts-ignore
            return message.channel.send(`Successfully created backup of "${channel.name}".`);
        });
    }
}