import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app-routing';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';



//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {DefaultComponent} from './components/default/default.component';
import { TareaNewComponent } from './components/tarea-new/tarea-new.component';
import { TareaEditComponent } from './components/tarea-edit/tarea-edit.component';
import { TareaDetailComponent } from './components/tarea-detail/tarea-detail.component';
import { ReactiveFormsModule } from '@angular/forms';





registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    TareaNewComponent,
    TareaEditComponent,
    TareaDetailComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzDividerModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, appRoutingProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
