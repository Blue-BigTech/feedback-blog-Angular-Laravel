import { Component, OnInit, Input, Injectable } from '@angular/core';
import {
  DataCommentsService,
} from 'src/app/shared/services/data-comments.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.scss'],
})

@Injectable({
  providedIn: 'root',
})

export class CreateFormComponent implements OnInit {

  @Input() uniqueId = 'none';
  @Input() targetId = 'none';
  @Input() feedbackId = 'none';
  @Input() type = 'none';
  
  visibleDropdownField: boolean = false;

  commentContent: string = '';
  safehtmlComment: SafeHtml = '';
  inputedCommentLetterNum: string = '';
  errorLetter: string = '';
  emptyCommentContent: boolean = false;

  //fileupload
  myfileName : any = [];
  myFiles:string [] = [];
  myFilesPreview:string [] = [];
  errImageSize: boolean = false;


  constructor(
    public dataCommentService: DataCommentsService,
    public dom:DomSanitizer
    ) {
    this.safehtmlComment=dom.bypassSecurityTrustHtml(this.inputedCommentLetterNum);
  }

  ngOnInit(): void {
    
  }

  onSelectFile(event:any):void {

    this.myFiles = [];
    this.myfileName = [];
    this.myFilesPreview = [];
    this.errImageSize = false;

    for (var i = 0; i < event.target.files.length; i++) {
      
      if (event.target.files[i].size > 1000000) {
        this.errImageSize = true;
        return;
      }

      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.myFilesPreview.push(event.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);

      this.myfileName.push(event.target.files[i].name);
      this.myFiles.push(event.target.files[i]);
    }
  }

  onCommentContentChange(e: any) { 

    let commentLength = e.target.value.length;

    if (commentLength > 0) {
      this.commentContent = e.target.value;
      this.inputedCommentLetterNum = "The number of characters you entered is <span style = 'color: white'>" + commentLength + "</span>/<span style = 'color:red'>1000</span> characters.";
      this.emptyCommentContent = false;     
    } else {
      this.commentContent = '';
      this.inputedCommentLetterNum = '';
    }
    this.safehtmlComment=this.dom.bypassSecurityTrustHtml(this.inputedCommentLetterNum);
  }

  onSubmitComment(): void {

    //validation
    if(this.commentContent.length === 0){
      this.emptyCommentContent = true;
      this.errorLetter = '*Required Content';
      return;
    } else if( this.commentContent.length > 1000 ) {
      this.emptyCommentContent = true;
      this.errorLetter = 'Content is no longer than 1000 character';
      return;
    }

    //formData
    const formData = new FormData();
    formData.append("feedback_id", this.feedbackId);

    if (this.myFiles.length !== 0) {
      for (var i = 0; i < this.myFiles.length; i++) { 
        formData.append("file[]", this.myFiles[i]);
      }      
    }

    //creatcomment or creat sub-comment
    if(this.type === 'createComment') {
      formData.append("comment", this.commentContent);
      this.dataCommentService.CreateComment(formData);
    } else {
      formData.append("content", this.commentContent);
      formData.append("comment_id", this.targetId);
      this.dataCommentService.CreateSubComment(formData);
    }

    // initialization
    this.commentContent = '';
    this.inputedCommentLetterNum = '';
    this.myfileName = [];
    this.myFiles = [];
    this.myFilesPreview = [];
    this.visibleDropdownField = false;
    this.safehtmlComment=this.dom.bypassSecurityTrustHtml(this.inputedCommentLetterNum); 
  }

  showDropdownField(): void {
    this.visibleDropdownField = true;
  }

  hideDropdownField(): void {
    if(this.commentContent.length === 0) {
      this.visibleDropdownField = false;
    }
  }
}
