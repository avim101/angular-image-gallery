// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
// config angular i18n
import en from '@angular/common/locales/en';

// VENDORS
import { NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';

// APP
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './features/home/welcome.component';
import { PROVIDER_LIST } from './share/services/image.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: 'imageProvider',
      useValue: PROVIDER_LIST.UNSPLASH
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
