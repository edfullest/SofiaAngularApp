import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsAnswersComponent } from './questions-answers/questions-answers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuestionsAnswersComponent],
  exports : [QuestionsAnswersComponent]
})
export class QuestionsAnswersModule { }
