
import { Component ,OnInit,OnChanges, ViewChildren, ElementRef, QueryList, AfterViewInit, Directive, Renderer, Input } from '@angular/core';
import {NgbModal, NgbModalRef ,ModalDismissReasons, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { DatePickerWithRangeService } from '../../../date-picker-with-range/date-picker-with-range.component';


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
  name : string;

  @Input() courseID;


  @ViewChildren('formQuestion') rows: QueryList<ElementRef>;

  ngOnInit(){
    this.questionsForm = this.fb.group({
      questions: this.fb.array([
        
      ])
    });
  }

  ngOnChanges(){
  }

  constructor(private modalService: NgbModal,
   private fb: FormBuilder, 
   private datePickerService : DatePickerWithRangeService,
   private _tokenService: Angular2TokenService) {
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);
    this._tokenService.init({
          apiBase: 'http://localhost:3000'
      }); 

  }
  nextInWizard(){
    console.log(this.courseID)
    $('#firstWizard').attr('class','modal-body invisible')
    $('#lastWizard').attr('class','modal-body visible')
    if (this.wizardStatus == "Siguiente"){
      this.wizardStatus = "Mandar"
    }
    else{
      var fromDate : NgbDateStruct = this.datePickerService.getFromDate()
      var toDate : NgbDateStruct = this.datePickerService.getToDate()
      var startDate = fromDate.year + "-" + fromDate.month + "-" + fromDate.day
      var endDate = toDate.year + "-" + toDate.month + "-" + toDate.day

      let formObj = this.questionsForm.getRawValue();
      var data = {
        "course_id" : this.courseID,
        "questions" : JSON.stringify(formObj),
        start_date: startDate,
        end_date: endDate,
        name: this.name
      }


      
      this._tokenService.request({
        method: "POST",
        url:    'http://localhost:3000/assignments',
        body: JSON.stringify(data)
      });

      this.modalRef.close()

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

  addQuestion(){
    (<FormArray>this.questionsForm.get('questions')).push(this.fb.group({
          question: [null, Validators.required],
          answers : this.fb.array([
                this.fb.group({
                  description: ['', Validators.required],
                  is_correct: [false,Validators.required]
              })
          ])
          
        }));
  }

  selectRightAnswer(i){
    console.log(i)
    this.selectedQuestionIndex = i

  }

  markCorrect(j){
    var checked : boolean = $("#checkbox" + j.toString()).prop('checked')
    $("#checkbox" + j.toString()).prop('checked', !checked);
    var questionsArray : FormArray = <FormArray>this.questionsForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[this.selectedQuestionIndex]
    var answersArray = <FormArray> selectedQuestion.get('answers')
    var controlsAnswer = (<FormArray>answersArray.controls[j])
    controlsAnswer.controls["is_correct"].setValue(!checked)
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
                  description: ['', Validators.required],
                  is_correct: [false,Validators.required]
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
