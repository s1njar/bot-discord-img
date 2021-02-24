import {Channel, Message} from "discord.js";
import {SaveImageService} from "../image/SaveImageService";
import {Inject} from "typescript-ioc";
import * as fetchMessages from "discord-fetch-all";
import {logger} from "../../../../app/helper/logger";
import appConfig from "../../../../app/config/application";

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
        const downloadMessage = await message.channel.send(`☸️ Creating backup of channel "${channel.name}".`);

        try {
            // @ts-ignore
            const messages = await fetchMessages.messages(channel, {
                reverseArray: true,
                userOnly: false,
                botOnly: false,
                pinnedOnly: false,
            });

            // @ts-ignore
            logger.info(`FINISHED => Messages DOWNLOAD of "${channel.name}"`)

            for (const channelMessage of messages) {
                if (channelMessage.attachments.size > 0) {
                    await new Promise(r => setTimeout(r, appConfig.imageTimeoutSleepMs));

                    await this.saveImageService.execute(channelMessage);
                    // @ts-ignore
                    logger.info(`FINISHED => IMAGE DOWNLOAD of "${channel.name}"`)
                }
            }

            await downloadMessage.delete()
            return;
        } catch (err) {
            logger.error(err.message);
        }
    }
}