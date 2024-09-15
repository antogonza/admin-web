import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  authService = inject(AuthService);
  users: User[] = [];

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert(error.error.message);
      }
    });
  }
}
