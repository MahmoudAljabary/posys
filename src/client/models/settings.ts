
import * as _ from 'lodash';

class Location {
  id: number;
  name: string;
}

type PrinterType = 'epson' | 'star';

class ApplicationSettings {
  businessName: string;
  locationName: number;
  location?: Location;
  terminalId: string;
  taxRate: number;
  currencyCode: string;
  customBusinessCurrency: string;
}

class PrinterSettings {
  name: string;
  type: PrinterType;
  characterWidth: number;
  header: string;
  footer: string;
  printMerchantReceipts: boolean;
  printReceiptBarcodes: boolean;
}

class DatabaseSettings {
  hostname: string;
  username: string;
  password: string;
  database: string;
}

class ServerSettings {
  port: number;
}

export class Settings {
  application: any;
  printer: any;
  db: any;
  server: any;

  constructor(initializer) {
    _.merge(this, initializer);
    if(!this.application) { this.application = new ApplicationSettings(); }
    if(!this.printer)     { this.printer = new PrinterSettings(); }
    if(!this.db)          { this.db = new DatabaseSettings(); }
    if(!this.server)      { this.server = new ServerSettings(); }
  }

  get isValid(): boolean {
    const { application, db } = this;

    return !_.isUndefined(application.currencyCode) && application.currencyCode.length > 0
      && application.taxRate >= 0
      && application.businessName
      && application.locationName

      && !_.isUndefined(db.hostname) && db.hostname.length > 0
      && !_.isUndefined(db.username) && db.username.length > 0
      && !_.isUndefined(db.password)
      && !_.isUndefined(db.database) && db.database.length > 0;
  }
}
