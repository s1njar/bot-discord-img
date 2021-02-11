import fs from "fs";
import discord from "discord.js";
import { Event } from "../../core/event/Event";
import { logger } from "../../../app/helper/logger";
import { SaveImageService } from "../service/SaveImageService";
import { Inject } from "typescript-ioc";

/**
 * @class ImageEvent
 */
export class ImageEvent extends Event {
    /**
     * @type discord.Client
     */
    public client: discord.Client;

    @Inject
    private saveImageService: SaveImageService

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
    private async fetchImages(message: discord.Message) {
        if (!message.attachments.size) {
            logger.info("Message does not contain any images.")
            return;
        }

        this.saveImageService.execute(message);
    }
}