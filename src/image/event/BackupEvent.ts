import {Event} from "../../core/event/Event";
import {BackupChannelService} from "../service/backup/BackupChannelService";
import {Inject} from "typescript-ioc";
import BackupServerService from "../service/backup/BackupServerService";


/**
 * @class BackupEvent
 */
export class BackupEvent extends Event {

    @Inject
    private backupChannelService: BackupChannelService
    @Inject
    private backupServerService: BackupServerService

    /**
     * Init event.
     */
    public init() {
        this.client.on('message', message => {
            this.message = message;

            this.backupChannel().then();
            this.backupServer().then();
        })
    }

    /**
     * Backup channel images.
     *
     * @private
     */
    private async backupChannel() {
        if (!this.containsContent('bb backup-channel') || !this.containsRole('Admin')) {
            return;
        }

        return this.backupChannelService.execute(this.message.channel, this.message);
    }

    /**
     * Backup server images.
     *
     * @private
     */
    private async backupServer() {
        if (!this.containsContentStart('bb backup-server') || !this.containsRole('Admin')) {
            return;
        }

        const commandArgs = this.getArguments();
        let categories = commandArgs.slice(2, commandArgs.length);

        if (!categories) {
            return this.message.channel.send('Please provide at least one server category name.');
        }

        return this.backupServerService.execute(this.message, categories)
    }
}