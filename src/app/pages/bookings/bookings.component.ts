import { Component } from '@angular/core';
import { TrainsService } from '../../../services/trains.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  trainList: any[] = [];
  loggedUserData: any;
  constructor(private trainSrv: TrainsService) {
    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.getAllTrains();
    }
  }
  getAllTrains() {
    this.trainSrv
      .getAllBookings(this.loggedUserData.passengerID)
      .subscribe((res: any) => {
        this.trainList = res.data;
      });
  }
}
