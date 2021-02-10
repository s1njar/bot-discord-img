import discord from "discord.js";
import {Event} from "../../core/event/Event";
import {logger} from "../../../app/helper/logger";

/**
 * @class ImageEvent
 */
export class ImageEvent extends Event {

    /**
     * @type discord.Client
     */
    public client: discord.Client;

    /**
     * Init event.
     */
    public init() {
        this.client.on('message', message => {
            this.fetchImages(message)
        })
    }

    /**
     * Fetch images.
     *
     * @param message
     * @private
     */
    private fetchImages(message: discord.Message) {
        if (!message.attachments.size) {
            logger.info("Has no image")
            return;
        }

        logger.info("Has an image")
    }
}