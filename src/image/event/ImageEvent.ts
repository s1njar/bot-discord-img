import { Event } from "../../core/event/Event";
import { SaveImageService } from "../service/image/SaveImageService";
import { Inject } from "typescript-ioc";
import { DeployChannelImagesService } from "../service/image/DeployChannelImagesService";
import { ListImageChannelsService } from "../service/ListImageChannelsService";
import { DeployServerImagesService } from "../service/image/DeployServerImagesService";
import { BaseGuildTextChannel } from "discord.js";

/**
 * @class ImageEvent
 */
export class ImageEvent extends Event {
  @Inject
  private saveImageService: SaveImageService;

  @Inject
  private deployChannelImagesService: DeployChannelImagesService;

  @Inject
  private deployServerImagesService: DeployServerImagesService;

  @Inject
  private listImageChannelsService: ListImageChannelsService;

  /**
   * Init event.
   */
  public init() {
    this.client.on("message", (message) => {
      this.message = message;

      this.fetchImages().then(null);
      this.deployChannelImages().then(null);
      this.deployServerImages().then(null);
      this.listImageChannels().then(null);
    });
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
  private async deployChannelImages() {
    if (
      !this.containsContentStart("dib deploy-channel") ||
      !this.containsRole("Admin")
    ) {
      return;
    }

    const channelName = this.getFirstArgument();
    const serverName = this.getArguments()[3] ?? this.message.guild.name;

    return this.deployChannelImagesService.execute(
      this.message,
      this.message.channel as BaseGuildTextChannel,
      channelName,
      serverName
    );
  }

  /**
   * Deploy Images.
   *
   * @private
   */
  private async deployServerImages() {
    if (
      !this.containsContentStart("dib deploy-server") ||
      !this.containsRole("Admin")
    ) {
      return;
    }

    const serverName =
      this.getFirstArgument() !== ""
        ? this.getFirstArgument()
        : this.message.guild.name;

    return this.deployServerImagesService.execute(this.message, serverName);
  }

  /**
   * List image channels.
   *
   * @private
   */
  private async listImageChannels() {
    if (!this.containsContentStart("dib list") || !this.containsRole("Admin")) {
      return;
    }

    const serverName =
      this.getFirstArgument() !== ""
        ? this.getFirstArgument()
        : this.message.guild.name;

    return this.listImageChannelsService.execute(this.message, serverName);
  }
}
