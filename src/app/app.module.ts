import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserIdToUserPipe } from './pipes/user-id-to-user.pipe';
import { ItemsComponent } from './pages/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    OrdersComponent,
    NavbarComponent,
    UserIdToUserPipe,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    FormsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule,
    TableModule,
    DividerModule,
    SidebarModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
