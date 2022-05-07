import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {DefaultComponent} from './components/default/default.component';
import { TareaNewComponent } from './components/tarea-new/tarea-new.component';
import { TareaEditComponent } from './components/tarea-edit/tarea-edit.component';
import { TareaDetailComponent } from './components/tarea-detail/tarea-detail.component';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'inicio', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'crear-tarea', component: TareaNewComponent},
  { path: 'editar-tarea/:id', component: TareaEditComponent},
  { path: 'tareas/:Estado', component: TareaDetailComponent},
  {path: '**', component: DefaultComponent}
  
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
