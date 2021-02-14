import { Event } from "../../core/event/Event";
import { SaveImageService } from "../service/SaveImageService";
import { Inject } from "typescript-ioc";
import {DeployImageService} from "../service/DeployImageService";

/**
 * @class ImageEvent
 */
export class ImageEvent extends Event {
    @Inject
    private saveImageService: SaveImageService

    @Inject
    private deployImageService: DeployImageService

    /**
     * Init event.
     */
    public init() {
        this.client.on('message', message => {
            this.message = message;

            this.fetchImages().then(null);
            this.deployImages().then(null);
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
        if (!this.containsContent('bb deploy') || !this.containsRole('Admin')) {
            return;
        }

        await this.deployImageService.execute(this.message);
    }
}