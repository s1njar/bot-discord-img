import fs from "fs";
import {logger} from "../../../app/helper/logger";
import {Message} from "discord.js";
import appConfig from "../../../app/config/application";

/**
 * @class ListImageChannelsService
 */
export class ListImageChannelsService {

    /**
     * Lists image channels.
     *
     * @param message
     */
    public async execute(message: Message) {
        const path = await this.getDirPath();

        fs.promises.readdir(path)
            .then((dirs) => {
                if (!dirs.length) {
                    message.channel.send('There are no channels available.');
                }

                dirs.forEach(dir => {
                    fs.promises.readdir(`${path}/${dir}`)
                        .then((files) => {
                            message.channel.send(`${dir} -> ${files.length}`);
                        })
                })
            })
            .catch(reason => {
                logger.error(reason.message)
                message.channel.send('There are no channels available.');
            })
    }

    /**
     * Returns dir path of images.
     *
     * @private
     */
    private async getDirPath(): Promise<string> {
        return appConfig.imageBaseDir.toLowerCase();
    }
}