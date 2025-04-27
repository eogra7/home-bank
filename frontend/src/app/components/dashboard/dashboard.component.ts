import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { AccountService, Account } from '../../services/account.service';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <mat-card *ngIf="user$ | async as user; else loginLink">
        <mat-card-header>
          <mat-card-title>Welcome to your Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>You are logged in as: {{ user.profile.name || user.profile.sub }}</p>
          <p>Email: {{ user.profile.email }}</p>
          <p>Session expires at: {{ user.expires_at | date:'medium' }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="warn" (click)="logout()">Logout</button>
        </mat-card-actions>
      </mat-card>
      <ng-template #loginLink>
      Your session has ended or you are not signed in.
        <a routerLink="/login">Return to home</a>
      </ng-template>

      <mat-card class="accounts-card">
        <mat-card-header>
          <mat-card-title>Your Accounts</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table *ngIf="accounts$ | async as accounts" [dataSource]="accounts" class="accounts-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Account Name</th>
              <td mat-cell *matCellDef="let account">{{ account.name }}</td>
            </ng-container>

            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let account">{{ account.type }}</td>
            </ng-container>

            <ng-container matColumnDef="balance">
              <th mat-header-cell *matHeaderCellDef>Balance</th>
              <td mat-cell *matCellDef="let account">{{ account.balance | currency }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
      
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    mat-card {
      margin-top: 20px;
    }
    .accounts-table {
      width: 100%;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;
  accounts$: Observable<Account[]>;
  displayedColumns: string[] = ['name', 'type', 'balance'];

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {
    this.user$ = this.authService.user$;
    this.accounts$ = this.accountService.getAccounts();
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
} 