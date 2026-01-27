import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SantriProvider {

  api = 'http://localhost/api-absensi/';

  constructor(private http: HttpClient) {}

  simpanSantri(data: any) {
    return this.http.post<any>(
      this.api + 'santri_create.php',
      data
    );
  }

  getSantri() {
    return this.http.get<any>(
      this.api + 'santri_get.php'
    );
  }

  simpanAbsensi(data: any) {
    return this.http.post<any>(
      this.api + 'absensi_save.php',
      data
    );
  }
  getAbsensi(filter: any) {
  return this.http.post<any>(
    this.api + 'absensi_get.php',
    filter
  );
}
getRekapAbsensi(filter: any) {
  return this.http.post<any>(
    this.api + 'absensi_rekap.php',
    filter
  );
}


}
