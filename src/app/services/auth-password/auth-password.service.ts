import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthPasswordService {

  constructor() { }

  private validPassword = '12345';  // Aquí defines tu contraseña
  private authenticated = false;

  private redirectUrl: string | null = null;  // URL a la que redirigir tras autenticación

  checkPassword(password: string): boolean {
    if (password === this.validPassword) {
      this.authenticated = true;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }

  // Método para resetear la autenticación después de acceder a la página
  resetAuthentication(): void {
    this.authenticated = false;
  }
}
