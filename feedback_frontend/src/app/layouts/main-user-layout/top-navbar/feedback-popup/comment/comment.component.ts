import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataCommentsService } from 'src/app/shared/services/data-comments.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/auth/token.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  filepath = environment.filepath;

  activeSortSubcommentBtn: string = 'newest';
  viewComCreateOrUpdateForm: boolean = false;
  viewSubCreateOrUpdateForm: boolean = false;
  viewFullLetter: boolean = false;
  closeResult: string = '';
  username: string = '';
  userId:any = '';
  role:any = '';

  images: any[] = [];

  constructor(
    public dataCommentService: DataCommentsService, 
    public route: ActivatedRoute, 
    private TokenService: TokenService,
    private modalService: NgbModal,) {}

  statusTypes: string[] = [
    'Under Review',
    'Planned',
    'In Progress',
    'Complete',
  ];

  ngOnInit(): void {
    this.userId = this.TokenService.getUserId();
    this.role = this.TokenService.getRole();
    // console.log(this.route.params);
    // this.route.params.subscribe((params: Params) => {
    //   let id: number = parseInt(params['id']);
    //   this.comment = this.data.getById(id);
    //   console.log('comment -> :', this.comment);
    // });
  }

  onViewFullLetter(): void {
    this.viewFullLetter = true;
    this.images = [];
    let arrImages = this.dataCommentService.clickedComment.file
    for(let i = 0; i < arrImages.length; i++) {
      this.images.push({src: this.filepath+arrImages[i]});
    }
  }

  onViewSummaryLetter(): void {
    this.viewFullLetter = false;
  }

  chooseSubcommentSort(str: string) {
    if (str === 'newest') {
      this.dataCommentService.commentsByFeedback.sort(function(a: any, b: any){
        return +new Date(b.updated_at) - +new Date(a.updated_at)
      });
    } else {
      this.dataCommentService.commentsByFeedback.sort(function(a: any, b: any){
        return +new Date(a.updated_at) - +new Date(b.updated_at)
      });
    }
    this.activeSortSubcommentBtn = str;
  }

  onViewForm (id: string, formtype:string) {

    let createform = document.getElementById(id+'1');
    let updateform = document.getElementById(id+'2')
    if ( formtype === 'updateComForm' ) {
      createform!.style.display = 'none';
      updateform!.style.display === 'none'
       ? updateform!.style.display = 'block'
       : updateform!.style.display = 'none';
    } else {
      updateform!.style.display = 'none';
      createform!.style.display === 'none'
      ? createform!.style.display = 'block'
      : createform!.style.display = 'none';
    }
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

  deleteFeedbackComment(content: any, id: string, name: string) {

    this.username = name;
    //modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //delete comment to dataCommentService
      this.dataCommentService.deleteFeedbackComment(id);

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteFeedbackSubComment(content: any, id: string, name: string) {

    this.username = name;
    //modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //delete subcomment to dataCommentService
      this.dataCommentService.deleteFeedbackSubComment(id);

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onPopUpImage(id: string) {

    let PopUpImageModal = document.getElementById("myModal");
    let ImgId = document.getElementById(id);
    let modalImg = document.getElementById("img01");
    PopUpImageModal!.style.display = "block";
    (modalImg as HTMLImageElement).src = (ImgId as HTMLImageElement).src;  
  }

  onCloseImage() {

    let PopUpImageModal = document.getElementById("myModal");
    PopUpImageModal!.style.display = "none";
  }
}
