import {
  BaseGuildTextChannel,
  Channel,
  GuildBasedChannel,
  GuildTextBasedChannelTypes,
  Message,
  TextChannel,
} from "discord.js";
import { SaveImageService } from "../image/SaveImageService";
import { Inject } from "typescript-ioc";
import * as fetchMessages from "discord-fetch-all";
import { logger } from "../../../../app/helper/logger";
import appConfig from "../../../../app/config/application";

/**
 * @class BackupChannelService
 */
export class BackupChannelService {
  @Inject
  private saveImageService: SaveImageService;

  /**
   * Executes backup of images.
   *
   * @param channel
   * @param message
   */
  public async execute(
    channel: BaseGuildTextChannel,
    message: Message
  ): Promise<void> {
    const downloadMessage = await message.channel.send(
      `☸️ Creating backup of channel "${channel.id}".`
    );

    try {
      const messages = channel.messages;

      for (const [key, channelMessage] of messages.cache) {
        if (channelMessage.attachments.size > 0) {
          await new Promise((r) =>
            setTimeout(r, appConfig.imageTimeoutSleepMs)
          );

          await this.saveImageService.execute(channelMessage);
        }
      }

      await downloadMessage.delete();
      return;
    } catch (err) {
      logger.error(err.message);
    }
  }
}
