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
        message.channel.send(`🎌 Started backup of channel ${channel.name} .`).then()

        try {
            // @ts-ignore
            const messages = await fetchMessages.messages(channel, {
                reverseArray: true,
                userOnly: true,
                botOnly: false,
                pinnedOnly: false,
            });

            for (const channelMessage of messages) {
                await setTimeout(async () => {
                    await this.saveImageService.execute(channelMessage);
                },100);
            }

            // @ts-ignore
            await message.channel.send(`✅ Successfully created backup of "${channel.name}".`);
            return;
        } catch (err) {
            logger.error(err.message);
        }
    }
}