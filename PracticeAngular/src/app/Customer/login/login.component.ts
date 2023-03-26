import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallServiceService } from 'src/app/Shared/api-call-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private apicall: ApiCallServiceService,
    private route: Router
  ) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get Mail() {
    return this.login.get('email');
  }
  get Pass() {
    return this.login.get('password');
  }

  ngOnInit(): void {}
  Onsubmit() {
    if (this.login.valid) {
      console.log(this.login.value);
      this.apicall.login(this.login.value).subscribe((res: any) => {
        if (res && res['status'] === 'ok' && res['data']['authToken']) {
          localStorage.setItem('token', res['data']['authToken']);
          console.log(res);
          this.route.navigateByUrl('/menu');
        }
      });
    } else {
      console.log('invalid');
      alert('Plese fill the required credentials');
    }
  }
}
