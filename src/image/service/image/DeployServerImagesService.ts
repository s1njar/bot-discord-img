import {Inject} from "typescript-ioc";
import {DeployChannelImagesService} from "./DeployChannelImagesService";
import {Message} from "discord.js";

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
    public async execute (message: Message, serverName: string) {
        const channels = message.guild.channels;

        message.channel.send('🎌 Started server deployment.').then();

        for (const channel of channels.cache.array()) {
            if (channel.parent && channel.type === 'text') {
                // @ts-ignore
                await this.deployChannelImagesService.execute(message, channel, '', serverName);
            }
        }

        message.channel.send('✅ Finished server deployment.').then();
    }
}