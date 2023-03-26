import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallServiceService } from 'src/app/Shared/api-call-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiCall: ApiCallServiceService,
    private route: Router
  ) {
    this.registerForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, Validators.required]],
      number: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get Mail() {
    return this.registerForm.get('email');
  }
  get Pass() {
    return this.registerForm.get('password');
  }
  get Number() {
    return this.registerForm.get('number');
  }
  get Name() {
    return this.registerForm.get('uname');
  }

  ngOnInit(): void {}
  Onsubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.apiCall.register(this.registerForm.value).subscribe((res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
      });
      this.registerForm.reset();
    } else {
      console.log('invalid');
      alert('Plese fill the required credentials');
    }
  }
}
