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
     * @param serverName
     */
    public async execute(message: Message, serverName: string) {
        const path = await this.getDirPath(serverName);

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
    private async getDirPath(serverName: string): Promise<string> {
        return `${appConfig.imageBaseDir}/backup/${serverName}`.toLowerCase();
    }
}