import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ApartmentAddComponent } from './apartment-add/apartment-add.component';
import { LoginComponent } from './login/login.component';
import { AuthIntercepter } from './shared/intercepter/auth-intercepter';
import { NotFoundComponent } from './not-found/not-found.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    ApartmentListComponent,
    ApartmentDetailComponent,
    ApartmentAddComponent,
    LoginComponent,
    NotFoundComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
