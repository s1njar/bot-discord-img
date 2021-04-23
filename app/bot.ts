import App from './app';
import {IServiceProvider} from "../src/core/provider/IServiceProvider";
import {IEvent} from "../src/core/event/IEvent";
import {Container} from "typescript-ioc";
import {ImageEvent} from "../src/image/event/ImageEvent";
import {BackupEvent} from "../src/image/event/BackupEvent";
import {HelpEvent} from "../src/image/event/HelpEvent";

const app = new App();

const events: IEvent[] = [
    Container.get(ImageEvent),
    Container.get(BackupEvent),
    Container.get(HelpEvent)
];

const serviceProvider: IServiceProvider[] = [
];

app.initializeEvents(events);
app.initializeServiceProvider(serviceProvider).then(() => {
    app.listen();
});