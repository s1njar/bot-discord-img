import {Message} from "discord.js";
import {SaveImageService} from "./SaveImageService";
import {Inject} from "typescript-ioc";

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
        await message.channel.messages.fetch().then(messages => {
            messages.forEach(async (channelMessage) => {
                await this.saveImageService.execute(channelMessage, 'backup');
            })
        })

        // @ts-ignore
        return message.channel.send(`Successfully created backup of "${message.channel.name}".`);
    }
}