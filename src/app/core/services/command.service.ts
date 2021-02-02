import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CommandService {

  public cols: Array<number>;
  public rows: Array<number>;
  public robotLocation: string;

  constructor(public toastController: ToastController) {
  }

  createBoard() {
    let self = this;

    this.cols = new Array<number>();
    this.rows = new Array<number>();

    for (let i = 0; i <= 4; i++) {
      self.rows.push(i);
    }
    for (let i = 4; i >= 0; i--) {
      self.cols.push(i);
    }

    return self;
  }
  commandMove(event) {
    // console.log(val);
    this.robotLocation = event.locationX + event.locationY;
  }

  async presentErrorToast(messageData) {
    const toast = await this.toastController.create({
      message: messageData,
      duration: 2000
    });
    toast.present();
  }

  robotPlaceValidation(roboX, roboY) {
    if (roboX < 0) {
      roboX = 0;
      return false;
    } else if (roboX > 4) {
      roboX = roboX - 1;
      return false;
    } else if (roboY < 0) {
      roboY = 0;
      return false;
    } else if (roboY > 4) {
      roboY = roboY - 1;
      return false;
    } else {
      return true;
    }
  }
}
