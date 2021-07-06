import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup | any;
  pattern = "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$";

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('', [Validators.pattern(this.pattern)]),
      password2: new FormControl('', [Validators.pattern(this.pattern)])
    }, { validators: passwordMatchValidator });
  }


  signup() {
    const signUpValue = { ...this.signupForm.value };
    delete signUpValue.password2;
    console.log("Signup info is ", signUpValue);
    this.dataService.signUp(signUpValue)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/home']);
        });
  }
}

export function passwordMatchValidator(control: AbstractControl) {
  const pwd1 = control.get('password');
  const pwd2 = control.get('password2');
  if (pwd1?.value != pwd2?.value)
    return { passwordMismatch: true };
  return null;
}
