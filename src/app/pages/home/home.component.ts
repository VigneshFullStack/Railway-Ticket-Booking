import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../../services/stations.service';
import { IStation, ResponseModel } from '../../../models/Station';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  stationList: IStation[] = [];
  travelObj: any = {
    fromStationId: '',
    toStationId: '',
    dateOfTravel: '',
  };

  constructor(private stationSrv: StationsService, private router: Router) {}
  ngOnInit(): void {
    this.loadStations();
  }
  loadStations() {
    this.stationSrv.getAllStations().subscribe(
      (res: ResponseModel) => {
        this.stationList = res.data;
      },
      (error) => {
        alert('Error Occoured' + JSON.stringify(error));
      }
    );
  }

  onSearch() {
    this.router.navigate([
      '/search',
      this.travelObj.fromStationId,
      this.travelObj.toStationId,
      this.travelObj.dateOfTravel,
    ]);
  }
}
