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
        message.channel.messages.fetch().then(messages => {
            messages.forEach(message => {
                this.saveImageService.execute(message, 'backup');
            })

            // @ts-ignore
            message.channel.send(`Successfully created backup of "${message.channel.name}".`);
        })
    }
}