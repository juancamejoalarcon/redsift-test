/**
 * React Dmarc Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

const watchedStores = [
  'counts',
  'messages'
];

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
  }

  loadView(state) {
    console.log('email-sift: loadView', state);
    // Register for storage update events on the "count" bucket so we can update the UI
    watchedStores.forEach(store => this.storage.subscribe([store], this.onStorageUpdate))
    switch (state.type) {
      case 'summary':
        return { html: 'summary.html', data: this.getData() };
      default:
        console.error('email-sift-web: unknown Sift type: ', state.type);
    }
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  onStorageUpdate = (value) => {
    console.log('email-sift-web: onStorageUpdate: ', value);
    return this.getData().then((data) => {
      // Publish 'counts' event to view
      this.publish('dataUpdate', data);
    });
  }

  getData() {
    return Promise.all([this.getCounts(), this.getMessages()]).then(([counts, messages]) => ({
      counts,
      messages
    }))
  }

  getCounts() {
    return this.storage.get({
      bucket: 'counts',
      keys: ['MESSAGES', 'WORDS']
    }).then((values) => {
      return {
        messageTotal: values[0].value || 0,
        wordTotal: values[1].value || 0,
        wpmTotal: ((values[1].value || 0) / (values[0].value || 1)).toFixed(2)
      };
    });
  }

  getMessages() {
    return this.storage.getAll({
      bucket: 'messages'
    }).then((values) => {
      return values.map(({ value }) => JSON.parse(value)) || [];
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
