import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryPage } from './summary';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
  declarations: [
    SummaryPage,
  ],
  imports: [
    MyDatePickerModule,
    IonicPageModule.forChild(SummaryPage)
  ],
})
export class SummaryPageModule {}
