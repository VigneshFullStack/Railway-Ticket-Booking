import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANT } from '../constant/constant';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/Station';
import { environment as env } from '../environments/environment'; // Alias the import

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  apiEndPoint: string = '';

  constructor(private http: HttpClient) {
    this.apiEndPoint = (env as any).ApiEndPoint;
  }

  getAllStations(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_STATION
    );
  }
}
