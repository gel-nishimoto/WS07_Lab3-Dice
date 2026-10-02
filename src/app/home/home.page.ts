import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular';

import { Motion } from '@capacitor/motion';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ]
})

export class HomePage implements OnInit, OnDestroy {

  diceNumber = 1;

  x = 0;
  y = 0;
  z = 0;

  async ngOnInit() {

    await Motion.addListener('accel', event => {

      this.x = event.acceleration.x ?? 0;
      this.y = event.acceleration.y ?? 0;
      this.z = event.acceleration.z ?? 0;

      console.log(this.x, this.y, this.z);

      if (
        Math.abs(this.x) > 3 ||
        Math.abs(this.y) > 3 ||
        Math.abs(this.z) > 3
      ) {
        this.changeDice();
      }

    });

  }

  async changeDice() {
    this.diceNumber = Math.floor(Math.random() * 6) + 1;

    await Haptics.vibrate();
  }

  ngOnDestroy() {
    Motion.removeAllListeners();
  }
}
