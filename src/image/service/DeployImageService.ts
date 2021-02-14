import {Message, MessageAttachment} from "discord.js";
import * as fs from "fs";
import {logger} from "../../../app/helper/logger";
import appConfig from "../../../app/config/application";

/**
 * @class DeployImageService
 */
export class DeployImageService {

    /**
     * @type Message
     * @private
     */
    private message: Message;

    /**
     * Execute deploy image service.
     *
     * @param message
     */
    public async execute(message: Message): Promise<void> {
        this.message = message;

        await this.deployImages();
    }

    /**
     * Deploy images from local storage.
     *
     * @private
     */
    private async deployImages() {
        const path = await this.getDirPath();

        fs.promises.readdir(path)
            .then((files) => {
                if (!files.length) {
                    this.message.channel.send('There are no images available for this channel.')
                }

                let attachment;
                files.forEach(file => {
                    attachment = new MessageAttachment(`${path}/${file}`);

                    this.message.channel.send(attachment);
                })
            })
            .catch(reason => {
                logger.error(reason.message)
                this.message.channel.send('There are no images available for this channel.')
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
        const channelPath = this.message.channel.name;

        return `${basePath}/${channelPath}`.toLowerCase();
    }
}