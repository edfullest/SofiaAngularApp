import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsAnswersComponent } from './questions-answers/questions-answers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [QuestionsAnswersComponent],
  exports : [QuestionsAnswersComponent]
})
export class QuestionsAnswersModule { }
