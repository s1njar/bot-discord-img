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
     * @type Message
     * @private
     */
    private message: Message;

    /**
     * @type string
     * @private
     */
    private channelPrefix: string;

    /**
     * Execute save image service.
     *
     * @param message
     * @param channelPrefix
     */
    public async execute(message: Message, channelPrefix = ''): Promise<void> {
        this.message = message;
        this.channelPrefix = channelPrefix;

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
        const dirPath = await this.getDirPath();
        const fileName = await this.getFileName(attachment);

        await fs.promises.mkdir(dirPath, { recursive: true })
            .catch(reason => {
                logger.error(reason.message);
            });

        await fs.promises.writeFile(`${dirPath}/${fileName}`, buffer)
            .catch(reason => {
                logger.error(reason.message)
            })
    }

    /**
     * Returns file path of image.
     *
     * @private
     */
    private async getDirPath(): Promise<string> {
        const basePath = appConfig.imageBaseDir;
        // @ts-ignore
        let channelPath = this.message.channel.name;

        if (this.channelPrefix) {
            channelPath = `${this.channelPrefix}_${channelPath}`;
        }

        return `${basePath}/${channelPath}`.toLowerCase();
    }

    /**
     * Returns file path of image.
     *
     * @private
     */
    private async getFileName(attachment: MessageAttachment): Promise<string> {
        return `${attachment.name}_${Date.now().toString()}`.toLowerCase();
    }
}