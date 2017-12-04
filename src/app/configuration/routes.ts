import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {NgModule} from '@angular/core';
import {RegistrationComponent} from '../registration/registration.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: true})
  ],
  exports: [RouterModule]

})

export class AppRoutingModule {
}
