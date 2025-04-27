import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin-callback', component: LoginComponent },
  { path: 'signout-callback', component: LoginComponent }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [AppComponent]
})
export class AppRouterModule {}