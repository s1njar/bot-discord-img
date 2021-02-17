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
    public execute(message: Message, channel: TextChannel, channelName: string = '', serverName: string = ''): void {
        this.message = message;
        this.channel = channel;
        this.channelName = channelName;
        this.serverName = serverName;

        this.deployImages();
    }

    /**
     * Deploy images from local storage.
     *
     * @private
     */
    private deployImages() {
        const path = this.getDirPath();

        try {
            const files = fs.readdirSync(path);

            if (!files.length) {
                this.message.channel.send(
                    `No images available for the channel ${this.channelName}.`
                ).then();
            }

            this.message.channel.send(`Started deployment for the channel ${this.channelName}.`).then();

            let attachment;
            files.forEach(file => {
                attachment = new MessageAttachment(`${path}/${file}`);
                this.channel.send(attachment).catch(reason => {
                    logger.error(reason.message);
                });
            })
        } catch (err) {
            logger.error(err.message)
            this.message.channel.send(
                `No images available for the channel ${this.channelName}.`
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