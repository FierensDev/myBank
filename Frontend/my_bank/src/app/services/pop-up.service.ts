import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }
  message: string = "az";
  showComponent = false;
 
  showNewMessage(newMessage: string){
    this.message = newMessage;
    this.showComponent = true;
    setTimeout(() => {
      this.showComponent = false;
    }, 3000);
  }
}
