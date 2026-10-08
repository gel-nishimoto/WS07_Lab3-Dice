import { Component, OnInit, signal } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})

export class HomePage implements OnInit {

  diceNumber = signal(1);

  x = signal(0);
  y = signal(0);
  z = signal(0);

  

  async getAccel() {

    const res = await Motion.addListener('accel', (myAccel) => {

      this.x.set(myAccel.acceleration.x ?? 0);
      this.y.set(myAccel.acceleration.y ?? 0);
      this.z.set(myAccel.acceleration.z ?? 0);

      if (
        Math.abs(this.x()) > 5 ||
        Math.abs(this.y()) > 5 ||
        Math.abs(this.z()) > 5
      ) {
        this.changeDice();
      }

    });

  }

  async changeDice() {
    this.diceNumber.set(Math.floor(Math.random() * 6) + 1);

    await Haptics.vibrate({
      duration: 100
    });
  }

  constructor() {
    this.getAccel();
  }

  ngOnInit() {
  }
}
