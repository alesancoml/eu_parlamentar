import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ArmazenamentoProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) {}

  public insert(contact: Contact){
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, contact);
  }

  public update(key: string, contact: Contact){
    return this.save(key, contact);
  }
  private save(key: string, contact: Contact){
    this.storage.set(key, contact);
  }
  public remove(key: string){
    return this.storage.remove(key);
  }
  public getAll(){
    let contacts: ContactList[] = [];
    this.storage.forEach((value: Contact, key: string, iterationNumber: Number) =>{
      let contact = new ContactList();
      contact.key = key;
      contact.contact = value;
      contacts.push(contact);
    })
      .then(() => {
        return Promise.resolve(contacts);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

}

export class Contact {
  name: string;
  logado: boolean;
}

export class ContactList{
  key: string;
  contact: Contact;
}
