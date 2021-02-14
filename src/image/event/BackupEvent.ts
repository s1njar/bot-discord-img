import {Event} from "../../core/event/Event";
import {BackupImageService} from "../service/BackupImageService";
import {Inject} from "typescript-ioc";


/**
 * @class BackupEvent
 */
export class BackupEvent extends Event {

    @Inject
    private backupImageService: BackupImageService

    /**
     * Init event.
     */
    public init() {
        this.client.on('message', message => {
            this.message = message;

            this.backupChannel().then();
        })
    }

    /**
     * Backup channel images.
     *
     * @private
     */
    private async backupChannel() {
        if (!this.containsContent('bb backup')) {
            return;
        }

        return this.backupImageService.execute(this.message);
    }
}