import { Event } from "../../core/event/Event";
import { SaveImageService } from "../service/SaveImageService";
import { Inject } from "typescript-ioc";
import {DeployImageService} from "../service/DeployImageService";
import {ListImageChannelsService} from "../service/ListImageChannelsService";

/**
 * @class ImageEvent
 */
export class ImageEvent extends Event {
    @Inject
    private saveImageService: SaveImageService

    @Inject
    private deployImageService: DeployImageService

    @Inject
    private listImageChannelsService: ListImageChannelsService

    /**
     * Init event.
     */
    public init() {
        this.client.on('message', message => {
            this.message = message;

            this.fetchImages().then(null);
            this.deployImages().then(null);
            this.listImageChannels().then(null);
        })
    }

    /**
     * Fetch images.
     *
     * @private
     */
    private async fetchImages() {
        if (!this.containsImage() || this.fromThisBot()) {
            return;
        }

        this.saveImageService.execute(this.message).then(null);
    }

    /**
     * Deploy Images.
     *
     * @private
     */
    private async deployImages() {
        if (!this.containsContentStart('bb deploy') || !this.containsRole('Admin')) {
            return;
        }

        const channelName = this.getArguments()[2] ? this.getArguments()[2] : '';

        await this.deployImageService.execute(this.message, channelName);
    }

    /**
     * List image channels.
     *
     * @private
     */
    private async listImageChannels() {
        if (!this.containsContent('bb list') || !this.containsRole('Admin')) {
            return;
        }

        await this.listImageChannelsService.execute(this.message);
    }
}