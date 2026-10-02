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

  async ngOnInit() {

    await Motion.addListener('accel', event => {

      const x = event.acceleration.x ?? 0;
      const y = event.acceleration.y ?? 0;
      const z = event.acceleration.z ?? 0;

      if (
        Math.abs(x) > 5 ||
        Math.abs(y) > 5 ||
        Math.abs(z) > 5
      ) {
        this.changeDice();
      }

    });

  }

  async changeDice() {

    this.diceNumber =
      Math.floor(Math.random() * 6) + 1;

    await Haptics.vibrate();

  }

  ngOnDestroy() {
    Motion.removeAllListeners();
  }

}
