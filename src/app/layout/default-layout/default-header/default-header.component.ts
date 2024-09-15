import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ButtonDirective,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from 'src/app/services/auth/auth-services.service';
import { LocalsService } from 'src/app/services/locals/locals.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss',
  standalone: true,
  imports: [ButtonDirective, CommonModule, ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  authService = inject(AuthService);
  localsService = inject(LocalsService);
  router = inject(Router);

  isOpen = false;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.localsService.getOneLocal().subscribe({
      next: (local: any) => {
        // Setear el valor de isOpen basado en el valor de local.isOpen
        this.isOpen = local.isOpen;
      },
      error: (err) => {
        console.error('Error al obtener el local:', err);
      }
    });
  }

  sidebarId = input('sidebar1');

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  startService() {
    this.localsService.openLocal().subscribe({
      next: (local: any) => {
        // Setear el valor de isOpen basado en el valor de local.isOpen
        this.isOpen = local.isOpen;
      },
      error: (err) => {
        console.error('Error al obtener el local:', err);
      }
    });
  }

  closeService() {
    this.localsService.closeLocal().subscribe({
      next: (local: any) => {
        // Setear el valor de isOpen basado en el valor de local.isOpen
        this.isOpen = local.isOpen;
      },
      error: (err) => {
        console.error('Error al obtener el local:', err);
      }
    });
  }

}
