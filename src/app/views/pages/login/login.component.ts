import { Component, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-services.service';
import { IconDirective } from '@coreui/icons-angular';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    FormsModule,
    FontAwesomeModule
  ],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private library: FaIconLibrary) {
    library.addIcons(faEye, faEyeSlash, faUser, faLock);
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('local', response.local.id);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error de login', error)
        alert(error.message);
      }
    );
  }

  onForgotPassword() {
    alert('Por favor, póngase en contacto con el desarrollador para recuperar su contraseña.');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
