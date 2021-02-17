import {Message, MessageAttachment, TextChannel} from "discord.js";
import * as fs from "fs";
import {logger} from "../../../../app/helper/logger";
import appConfig from "../../../../app/config/application";

/**
 * @class DeployChannelImagesService
 */
export class DeployChannelImagesService {

    /**
     * @type Message
     * @private
     */
    private message: Message;

    /**
     * @type TextChannel
     * @private
     */
    private channel: TextChannel;

    /**
     * @type string
     * @private
     */
    private channelName: string;

    /**
     * @type string
     * @private
     */
    private serverName: string;

    /**
     * Execute deploy image service.
     *
     * @param message
     * @param channel
     * @param channelName
     * @param serverName
     */
    public async execute(message: Message, channel: TextChannel, channelName: string = '', serverName: string = ''): Promise<void> {
        this.message = message;
        this.channel = channel;
        this.channelName = channelName;
        this.serverName = serverName;

        return this.deployImages();
    }

    /**
     * Deploy images from local storage.
     *
     * @private
     */
    private async deployImages() {
        const path = this.getDirPath();

        try {
            const files = fs.readdirSync(path);

            if (!files.length) {
                this.message.channel.send(
                    `🔴 No images available for the channel "${this.channelName}".`
                ).then();
                return;
            }

            this.message.channel.send(`🎌 Started deployment for the channel "${this.channelName}".`).then();

            let attachment;
            for (const file of files) {
                attachment = new MessageAttachment(`${path}/${file}`);
                await this.channel.send(attachment).catch(reason => {
                    logger.error(reason.message);
                });
            }

            this.message.channel.send(`✅ Finished deployment for the channel "${this.channelName}".`).then();
        } catch (err) {
            logger.error(err.message)
            this.message.channel.send(
                `🔴 No images available for the channel "${this.channelName}".`
            ).then()
        }
    }

    /**
     * Returns file path of image.
     *
     * @private
     */
    private getDirPath(): string {
        const basePath = appConfig.imageBaseDir;
        // @ts-ignore
        this.channelName = this.channelName ? this.channelName : this.channel.name;

        return `${basePath}/${this.serverName}/${this.channelName}`.toLowerCase();
    }
}