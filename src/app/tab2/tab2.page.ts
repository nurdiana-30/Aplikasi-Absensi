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
  IonSegment,
  IonSegmentButton,
  IonButton
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';
import { SantriProvider } from '../providers/santri.provider';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonButton
  ]
})
export class Tab2Page implements OnInit {

  santri: any[] = [];
  absensi: { [key: number]: string } = {};
  tanggal: string = new Date().toISOString().substring(0, 10);

  constructor(
    private santriProvider: SantriProvider,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.loadSantri();
  }

  loadSantri() {
    this.santriProvider.getSantri().subscribe(res => {
      if (res.status) {
        this.santri = res.data;

        // ✅ default HADIR supaya tidak kosong
        this.santri.forEach(s => {
          this.absensi[s.id] = 'Hadir';
        });
      }
    });
  }

  simpanAbsensi() {
    if (!this.tanggal) {
      this.showToast('Tanggal belum dipilih', 'danger');
      return;
    }

    const dataAbsensi: any[] = [];

    for (let id in this.absensi) {
      dataAbsensi.push({
        santri_id: id,
        status: this.absensi[id]
      });
    }

    if (dataAbsensi.length === 0) {
      this.showToast('Data absensi kosong', 'danger');
      return;
    }

    const payload = {
      tanggal: this.tanggal,
      absensi: dataAbsensi
    };

    console.log('KIRIM KE API:', payload);

    this.santriProvider.simpanAbsensi(payload).subscribe({
      next: (res) => {
        this.showToast(res.message, res.status ? 'success' : 'danger');
      },
      error: () => {
        this.showToast('Koneksi server gagal', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
