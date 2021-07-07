import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm | any;

  pattern = '^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$';

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    const signInValue = { ...this.loginForm.value };
    console.log(this.loginForm)
    this.dataService.signIn(signInValue)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/home']);
      });
  }
}
