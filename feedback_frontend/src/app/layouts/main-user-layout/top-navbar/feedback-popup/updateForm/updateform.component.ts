import { Component, OnInit, Input, Injectable } from '@angular/core';
import {
  DataCommentsService,
} from 'src/app/shared/services/data-comments.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.scss'],
})

@Injectable({
  providedIn: 'root',
})

export class UpdateFormComponent implements OnInit {

  @Input() targetId = 'none';
  @Input() uniqueId = 'none';
  @Input() comment = '';
  @Input() type = 'none';

  visibleDropdownField: boolean = false;
  emptyCommentContent: boolean = false;
  safehtmlComment: SafeHtml = '';
  inputedCommentLetterNum: string = '';
  errorLetter: string = '';

  //image upload
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
      this.comment = e.target.value;
      this.inputedCommentLetterNum = "The number of characters you entered is <span style = 'color: white'>" + commentLength + "</span>/<span style = 'color:red'>1000</span> characters.";
      this.emptyCommentContent = false;     
    } else {
      this.comment = '';
      this.inputedCommentLetterNum = '';
    }
    this.safehtmlComment=this.dom.bypassSecurityTrustHtml(this.inputedCommentLetterNum);
  }

  onUpdateComment(): void {

    //validation
    if(this.comment.length === 0){
      this.emptyCommentContent = true;
      this.errorLetter = '*Required Content';
      return;
    } else if( this.comment.length > 1000 ) {
      this.emptyCommentContent = true;
      this.errorLetter = 'Content is no longer than 1000 character';
      return;
    }

    console.log(this.targetId);

    //formData
    const formData = new FormData();
    formData.append("id", this.targetId);

    if (this.myFiles.length !== 0) {
      for (var i = 0; i < this.myFiles.length; i++) { 
        formData.append("file[]", this.myFiles[i]);
      }      
    }

    //update comment or sub-comment sub-comment
    if (this.type === 'updateComment') {
      formData.append("comment", this.comment);
      this.dataCommentService.UpdateComment(formData);
    } else {
      formData.append("content", this.comment);
      this.dataCommentService.UpdateSubComment(formData)
    }

    // initialization
    this.comment = '';
    this.inputedCommentLetterNum = '';
    this.myfileName = [];
    this.myFilesPreview = [];
    this.visibleDropdownField = false;
    this.safehtmlComment=this.dom.bypassSecurityTrustHtml(this.inputedCommentLetterNum);
  }

  showDropdownField(): void {
    this.visibleDropdownField = true;
  }

  hideDropdownField(): void {
    if(this.comment.length === 0) {
      this.visibleDropdownField = false;
    }
  }
}
