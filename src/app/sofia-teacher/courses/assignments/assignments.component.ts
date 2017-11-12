import { Component, OnInit,OnChanges, ViewChildren, ElementRef, QueryList, AfterViewInit, Directive, Renderer, Input } from '@angular/core';
import {NgbModal, NgbModalRef ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';


// @Directive({
//   selector : 'question-input'
// })
// class QuestionInput {
//   constructor(public renderer: Renderer, public elementRef: ElementRef) {}
  
//   // It won't work at construction time
//   ngOnInit() {
//     this.renderer.invokeElementMethod(
//       this.elementRef.nativeElement, 'focus', []);
//   }
// }


@Component({
  selector: 'create-assignment',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit,OnChanges {

  modalRef: NgbModalRef;
  closeResult: string;
  questionsForm: FormGroup;
  answersForm: FormGroup;
  wizardStatus : string = "Siguiente";
  selectedQuestionIndex : number;

  @ViewChildren('formQuestion') rows: QueryList<ElementRef>;

  ngOnInit(){
    this.questionsForm = this.fb.group({
      questions: this.fb.array([
        
      ])
    });


    // this.answersForm = this.fb.group({
    //   answers: this.fb.array([])
    // });

    // (<FormArray>this.answersForm.get('answers')).push(new FormControl());
  }

  ngOnChanges(){
  }

  // ngAfterViewInit() {
  //   this.rows.changes.subscribe(children => {
  //     console.log(this.rows)
  //     var index = (<FormArray>this.questionsForm.get('questions')).length - 1

  //     console.log(index)
  //     this.focusLast(index)
  //   });
  // }

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);

  }
  nextInWizard(){
    $('#firstWizard').attr('class','modal-body invisible')
    $('#lastWizard').attr('class','modal-body visible')
    if (this.wizardStatus == "Siguiente"){
      this.wizardStatus = "Mandar"
    }
    else{
      var questions : FormArray = <FormArray>this.questionsForm.get('questions')
      var answers : FormArray = <FormArray>this.answersForm.get('answers')
      console.log(questions.controls)
      console.log(answers.controls)
      console.log((questions.controls[0]).value)
      // console.log(this.questionsForm.get('questions'))
      // console.log(this.answersForm.get('answers'))
    }
  }  

  open(content) {
    this.modalRef = this.modalService.open(content, {
        size: 'lg',
    });;
    this.modalRef.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });    
  }

  // selectQuestion(i){
  //   this.questionsForm.get('questions')
  // }

  addQuestion(){
    (<FormArray>this.questionsForm.get('questions')).push(this.fb.group({
          answers : this.fb.array([
                this.fb.group({
                  description: [Math.random(), Validators.required]
              })
          ]),
          correctAnswer : [null, Validators.required],
          question: [null, Validators.required]
        }));
    // var index = (<FormArray>this.questionsForm.get('questions')).length - 1

  }

  selectRightAnswer(i){
    console.log(i)
    this.selectedQuestionIndex = i

  }

  selectQuestion(i){
      this.selectedQuestionIndex = i 
  }

  addAnswer(){
    var questionsArray : FormArray = <FormArray>this.questionsForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[this.selectedQuestionIndex]
    console.log(selectedQuestion)
    var answersArray = <FormArray> selectedQuestion.get('answers')
     answersArray.push(this.fb.group({
                  description: [Math.random(), Validators.required]
              }))
    console.log()

    // (<FormArray>this.questionsForm.get('questions')[this.selectedQuestionIndex].get('answers')).push(new FormControl());
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
