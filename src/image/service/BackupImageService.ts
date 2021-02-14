import {Message} from "discord.js";
import {SaveImageService} from "./SaveImageService";
import {Inject} from "typescript-ioc";
import * as fetchMessages from "discord-fetch-all";

/**
 * @class BackupImageService
 */
export class BackupImageService {

    @Inject
    private saveImageService: SaveImageService

    /**
     * Executes backup of images.
     *
     * @param message
     */
    public async execute(message: Message) {
        // @ts-ignore
        const messages = await fetchMessages.messages(message.channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });

        messages.forEach(channelMessage => {
            this.saveImageService.execute(channelMessage, 'backup');
        })

        // @ts-ignore
        return message.channel.send(`Successfully created backup of "${message.channel.name}".`);
    }
}