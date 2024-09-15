import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthPasswordService } from 'src/app/services/auth-password/auth-password.service';


export const authPasswordGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthPasswordService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Guarda la URL a la que intentaba acceder
    authService.setRedirectUrl(state.url);
    // Redirige al formulario de contraseña
    router.navigate(['/password-protect']);
    return false;
  }
};
