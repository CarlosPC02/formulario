import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    private _loginService: LoginService,
    private router: Router) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
    });
  }

   ngOnInit(): void {
    
   }

  login() {

    this._loginService.login(this.loginForm.value).subscribe((res: any) => {
      const token = res.token;
      const name = res.name;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
     // this.router.navigate([''])
    });
  }
}
