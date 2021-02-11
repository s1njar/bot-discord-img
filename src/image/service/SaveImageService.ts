import { MessageAttachment } from "discord.js";
import { logger } from "../../../app/helper/logger";
import { Message } from "discord.js";
import appConfig from "../../../app/config/application";
import fetch from "node-fetch";
import * as fs from "fs";

/**
 * @class SaveImageService
 */
export class SaveImageService {

    /**
     * @type discord.Message
     * @private
     */
    private message: Message;

    /**
     * Execute save image service.
     *
     * @param attachment
     */
    public async execute(message: Message): Promise<void> {
        this.message = message;

        message.attachments.each(async (attachment) => {
            await this.downloadImage(attachment);
        })
    }

    /**
     * Download image via url.
     *
     * @param attachment
     * @private
     */
    private async downloadImage (attachment: MessageAttachment): Promise<void> {
        const response = await fetch(attachment.url);
        const buffer = await response.buffer();
        const dirPath = await this.getDirPath(attachment);
        const fileName = await this.getFileName(attachment);

        await fs.promises.mkdir(dirPath, { recursive: true })
            .catch(reason => {
                logger.error(reason.message);
            });

        await fs.promises.writeFile(`${dirPath}/${fileName}`, buffer)
            .then(value => {
                logger.info('Successfully downloaded image.')
            })
            .catch(reason => {
                logger.error(reason.message)
            })
    }

    /**
     * Returns file path of image.
     *
     * @private
     */
    private async getDirPath(attachment: MessageAttachment): Promise<string> {
        let basePath = appConfig.imageBaseDir;
        let guildPath = this.message.guild.name;
        // @ts-ignore
        let channelPath = this.message.channel.name;

        return `${basePath}/${guildPath}/${channelPath}`;
    }

    /**
     * Returns file path of image.
     *
     * @private
     */
    private async getFileName(attachment: MessageAttachment): Promise<string> {
        let file = attachment.name;

        return file;
    }
}