import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IPassenger } from '../models/Station';
import { TrainsService } from '../services/trains.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  registerObj: IPassenger = new IPassenger();

  loggedUserData: any;
  constructor(private trainSrv: TrainsService) {
    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  logoff() {
    localStorage.removeItem('trainUser');
    this.loggedUserData = undefined;
  }

  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    console.log('registerObj : ', this.registerObj);
    this.trainSrv.createPassenger(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Registration Success');
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeRegister();
      } else {
        alert(res.message);
      }
    });
  }
  onLogin() {
    this.trainSrv.login(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Login Success');
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeLogin();
      } else {
        alert(res.message);
      }
    });
  }
}
