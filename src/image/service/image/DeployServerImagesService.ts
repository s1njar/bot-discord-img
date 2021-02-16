import {Inject} from "typescript-ioc";
import {DeployChannelImagesService} from "./DeployChannelImagesService";
import {Message, TextChannel} from "discord.js";

/**
 * @class DeployServerImagesService
 */
export class DeployServerImagesService {

    @Inject
    private deployChannelImagesService: DeployChannelImagesService

    /**
     * Execute deployment of all images for specific server.
     *
     * @param message
     * @param serverName
     */
    public execute (message: Message, serverName: string) {
        const channels = message.guild.channels;

        channels.cache.forEach((channel: TextChannel) => {
            if (channel.parent && channel.type === 'text') {
                this.deployChannelImagesService.execute(message, channel, '', serverName);
            }
        })
    }
}