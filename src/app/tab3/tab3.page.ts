import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonList,
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { SantriProvider } from '../providers/santri.provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonDatetime,
    IonList,
    IonButton,
    IonSelect,
    IonSelectOption
  ]
})
export class Tab3Page implements OnInit {

  absensi: any[] = [];

  tanggal: string = '';
  bulan: string = '';

  constructor(
    private santriProvider: SantriProvider,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.loadAbsensi();
  }

  loadAbsensi() {
    const payload: any = {};

    // 🔥 PRIORITAS: tanggal > bulan
    if (this.tanggal) {
      payload.tanggal = this.tanggal.substring(0, 10);
    } else if (this.bulan) {
      payload.bulan = this.bulan;
    }

    this.santriProvider.getAbsensi(payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.absensi = res.data;
        } else {
          this.absensi = [];
          this.showToast(res.message || 'Data tidak ditemukan', 'warning');
        }
      },
      error: () => {
        this.showToast('Koneksi server gagal', 'danger');
      }
    });
  }

  resetFilter() {
    this.tanggal = '';
    this.bulan = '';
    this.loadAbsensi();
  }

  async showToast(msg: string, color: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
      color
    });
    t.present();
  }
}
