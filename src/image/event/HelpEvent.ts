import { Event } from "../../core/event/Event";
import { Colors, EmbedBuilder } from "discord.js";

/**
 * @class HelpEvent
 */
export class HelpEvent extends Event {
  /**
   * Init event.
   */
  public init() {
    this.client.on("message", (message) => {
      this.message = message;

      this.showHelp().then();
    });
  }

  /**
   * Backup channel images.
   *
   * @private
   */
  private async showHelp() {
    if (!this.containsContent("dib help") || !this.containsRole("Admin")) {
      return;
    }

    const helpEmbed = new EmbedBuilder()
      .setTitle(`Welcome!`)
      .setColor(Colors.DarkRed)
      .setDescription(`How may I assist you ?`)
      .setThumbnail(
        "https://cdn.discordapp.com/app-icons/809208791316824095/ad2828122805b48d24c40fa2c0d3da4a.png?size=256"
      )
      .setImage(
        "https://i.kym-cdn.com/photos/images/original/000/862/409/1f1.jpg"
      )
      .addFields(
        {
          name: "dib list | dib list <server_name>",
          value: `Lists all channel of specific server.`,
        },
        {
          name: "dib backup-channel",
          value: `Creates backup of current channel.`,
        },
        {
          name: 'dib backup-server "<category>" "<category>"',
          value: `Creates backup of channel below given category names.`,
        },
        {
          name: "dib deploy-channel | dib deploy-channel <channel_name> <server_name>",
          value: `Uploads images in current channel. Location and name of the uploaded channels can be specified by given parameters.`,
        },
        {
          name: "dib deploy-server | dib deploy-server <server_name>",
          value: `Go's through all server channel and uploads images in matching channels. Images from other servers can be specified by given parameters.`,
        }
      );

    this.message.channel.send({ embeds: [helpEmbed] }).then();
  }
}
