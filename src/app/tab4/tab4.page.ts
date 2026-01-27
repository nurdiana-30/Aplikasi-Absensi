import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { SantriProvider } from '../providers/santri.provider';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab4Page {

  form: any = {
    nis: '',
    nama: '',
    jk: '',
    kelas: '',
    umur: '',
    alamat: '',
    wali: '',
    hp: ''
  };

  constructor(
    private santri: SantriProvider,
    private toast: ToastController
  ) {}

  simpan() {

    // VALIDASI WAJIB
    if (!this.form.nis || !this.form.nama) {
      this.showToast('NIS dan Nama wajib diisi', 'danger');
      return;
    }

    console.log('DATA DIKIRIM:', this.form); // 🔥 DEBUG WAJIB

    this.santri.simpanSantri(this.form).subscribe({
      next: (res: any) => {
        this.showToast(res.message, res.status ? 'success' : 'danger');

        if (res.status) {
          this.form = {}; // reset form
        }
      },
      error: () => {
        this.showToast('Koneksi ke server gagal', 'danger');
      }
    });
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
