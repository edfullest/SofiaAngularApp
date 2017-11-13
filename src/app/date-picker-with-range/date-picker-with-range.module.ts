import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerWithRangeComponent, DatePickerWithRangeService } from './date-picker-with-range.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [DatePickerWithRangeComponent],
  exports : [DatePickerWithRangeComponent]
})
export class DatePickerWithRangeModule { }
