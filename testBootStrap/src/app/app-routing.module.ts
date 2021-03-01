import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { QueryComponent } from './components/query/query.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'consulta', component: QueryComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
