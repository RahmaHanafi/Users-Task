import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserComponent } from './components/all-user/all-user.component';
import { SpecificUserComponent } from './components/specific-user/specific-user.component';

const routes: Routes = [
  { path: '', component: AllUserComponent },
  { path: 'users', component: AllUserComponent },
  { path: 'users/:id', component: SpecificUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
