import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { ApartmentAddComponent } from './apartment-add/apartment-add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes = [
  { path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'list', component: ApartmentListComponent, canActivate: [AuthGuard] },
  { path: 'save', component: ApartmentAddComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ApartmentAddComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ApartmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent, data: { msg: "No Page Found!" } },
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
