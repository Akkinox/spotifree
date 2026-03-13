import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorLogin: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin  = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    );
  }

  public sendLogin(): void {
    const {email, password} = this.formLogin.value;
    this.authService.sendCredentials(email, password)
    .subscribe((response) => {
        console.log("Sesion iniciada con exito");
        this.router.navigate(['/', 'tracks']);
      },
      (error) => {
        console.error("Error al iniciar sesion");
        this.errorLogin = true;
      }
    );
  }

}
