import { Component, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataCommentsService } from 'src/app/shared/services/data-comments.service';
import { PopupsServiceService } from 'src/app/shared/services/popups-service.service';
import { TokenService } from 'src/app/shared/services/auth/token.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss'],
})
export class BugsComponent implements OnInit, AfterContentChecked {
  @Output() update = new EventEmitter<any>();

  sortType: string = 'Top';
  filterType: string = 'None';
  statusType: string = 'None';
  role: any = '';
  userId: any = '';
  seletedTitle : string = '';
  closeResult: string = '';

  sortTypes: string[] = ['My Own', 'Top', 'New'];
  settingTypes: string[] = ['edit','delete'];
  filterTypes: string[] = [
    'Under Review',
    'Planned',
    'In Progress',
    'Complete',
  ];

  title = 'angulartoastr';
  showModal: boolean = false;


  constructor(
    public popupsService: PopupsServiceService,
    public dataCommentService: DataCommentsService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private TokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.role = this.TokenService.getRole();
    this.userId = this.TokenService.getUserId();
  } 

  ngAfterContentChecked(): void {
    // console.log(this.route.children.length);
    // if (this.route.children.length !== 0) {
    //   this.data.allCommentsVisible = false;
    // } else {
    //   this.data.allCommentsVisible = true;
    // }
  }

  chooseSortType(item: string): void {
    this.sortType = item;
  }

  chooseStatusType(status: string, item: any): void {
    let statusNum = this.filterTypes.indexOf(status);

    const formData = new FormData();
    formData.append("id", item._id);
    formData.append("status", (statusNum+1).toString());
    this.dataCommentService.updateFeedback(formData, 'statusUpdating');
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
  
  onMore(settingType: string, item: any, content:any) {
    if (settingType === 'edit') {
      this.update.emit(item);
    } else {
      this.seletedTitle = item.title;
      //modal
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        //delete feedback to dataCommentService
        this.dataCommentService.deleteFeedback(item._id);

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  onCheckInfo () {

    let notifyInfo = this.dataCommentService.notifyInfo;
    let arrfeedbacksIds;
    let arrfeedbackCommentsIds;

    if(notifyInfo.feedbacks === undefined || notifyInfo.feedbackcomments === undefined) return;

    const formData = new FormData();

    if (notifyInfo.feedbacks.length !== 0) {
      arrfeedbacksIds = notifyInfo.feedbacks.map((feedback:any)=>(feedback._id ));
      for (var i = 0; i < arrfeedbacksIds.length; i++) { 
        formData.append("feedback_ids[]", arrfeedbacksIds[i]);
      }
    } 
    
    if (notifyInfo.feedbackcomments.length !== 0) {
      arrfeedbackCommentsIds = notifyInfo.feedbackcomments.map((feedbackcomment:any)=>(feedbackcomment._id));
      for (var i = 0; i < arrfeedbackCommentsIds.length; i++) { 
        formData.append("feedbackcomment_ids[]", arrfeedbackCommentsIds[i]);
      }
    } 

    if (!this.dataCommentService.stopCheckNotify && this.dataCommentService.notifyInfoCount !== 0) 
      this.dataCommentService.checkNotify(formData);
  }
}
