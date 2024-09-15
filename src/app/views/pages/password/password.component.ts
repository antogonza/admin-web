import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPasswordService } from 'src/app/services/auth-password/auth-password.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  password = '';
  errorMessage = '';
  authService = inject(AuthPasswordService);
  router = inject(Router);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.authService.checkPassword(this.password)) {
      const redirectUrl = this.authService.getRedirectUrl() || '/dashboard'; // Redirige a la URL original o al dashboard
      this.router.navigate([redirectUrl]).then(() => {
        this.authService.resetAuthentication();  // Limpiar estado después de la redirección
        this.authService.clearRedirectUrl();  // Limpia la URL de redirección
      });
    } else {
      this.errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
    }
  }

}
