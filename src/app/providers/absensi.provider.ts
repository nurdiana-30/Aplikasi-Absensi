import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SantriProvider {

  api = 'https://nurdiana.perangkatlunak.my.id/api/';

  constructor(private http: HttpClient) {}

  getSantri() {
    return this.http.get<any>(this.api + 'santri_get.php');
  }

  simpanAbsensi(data: any) {
    return this.http.post<any>(this.api + 'absensi_save.php', data);
  }
}
