import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TokenService } from './auth/token.service';

export type PostType = {
  _id: string;
  title: string;
  details: string;
  category: number;
  comments: any;
  votes: any[];
  user_id: string;
  status: number;
  notify: number;
  file: string[];
  updated_at: string;
  created_at: string;
  user_name: string;
  user_role: number;
  user_avatar: any;
  feedback_comments: CommentType[];
};

export type CommentType = {
  _id: string;
  comment: string;
  user_id: string;
  feedback_id: string;
  notify: number;
  file: any;
  updated_at: string;
  created_at: string;
  user_name: string;
  user_role: number;
  user_avatar: any;
  sub_comments: any;
};

export type NotifyType = {
  feedbacks: any;
  feedbackcomments: any;
}


@Injectable({
  providedIn: 'root',
})
export class DataCommentsService {
  private api = environment.api;


  notifyInfoCount : number = 0;
  allCommentsVisible: boolean = true;
  arrViewSubComForm: boolean[] = [];
  stopCheckNotify: boolean = false;
  clickedComment = {} as any;
  commentsByFeedback: CommentType[] = [];
  feedbacks: PostType[] = [];
  results: PostType[] = [];
  notifyInfo = {} as NotifyType;

  constructor(
    private http: HttpClient,
    private token:TokenService,
    private toastr:ToastrService
  ) {}

  loadFeedbacks(category: number) {

    this.feedbacks = [];
    const params = new HttpParams()
    .set('category', category);

    this.http.get<any>(this.api + 'GetAllFeedback', {params})
    .subscribe((response) => {
      if (response.result) {
        this.feedbacks = response.data;
      }
    });
  }

  getFeedbacks(sortType: string) {

    let sortTypes: string[] = ['Under Review', 'Planned', 'In Progress', 'Complete',];
    let status = sortTypes.indexOf(sortType);
    if (status !== -1) {
      this.results = this.feedbacks.filter((feedback)=>(feedback.status === (status+1)));
    } else {
      if (sortType === 'Top') {
        this.results = this.feedbacks.sort((a, b) => (
          b.votes.length - a.votes.length
        ));
      } else if (sortType === 'My Own') {
        let userId = this.token.getUserId();
        this.results = this.feedbacks.filter((feedback) => (feedback.user_id === userId))
      } else if (sortType === 'New') {
          this.results = this.feedbacks.sort(function(a, b){
          return +new Date(b.updated_at) - +new Date(a.updated_at);
        });
      }
    }
    return this.results;
  }

  createFeedback(formData: FormData) {      
      
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };
    
    this.http.post<any>(this.api + 'CreateFeedback', formData, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.feedbacks.push(response.data);
        this.toastr.success('Created post successfully.', 'Success'); return;
      }
      this.toastr.error(response.message, 'Fail'); return;
    });
  }

  updateFeedback(formData: FormData, updateType: string ) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'UpdateFeedback', formData, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        if(updateType !== 'statusUpdating' ) {
          this.feedbacks = this.feedbacks.map((item) => {
            if (item._id === formData.get('id')) {
              item.title = response.data.title;
              item.details = response.data.details;
              item.file = response.data.file;
            }
            return item;
          });
          this.toastr.success('Updated the feedback successfully.', 'Success');
        } else {
          this.feedbacks = this.feedbacks.map((item) => {
            if (item._id === formData.get('id')) {
              item.status = response.data.status;
            }
            return item;
          });
          this.toastr.success('Updated the status successfully.', 'Success');
        }
      }
    });
  }

  deleteFeedback(itemId: string) {

    let data = {
      feedback_id : itemId,
    }

    const httpOptions = {
      body: data,
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.delete<any>(this.api + 'DeleteFeedback', httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.feedbacks = this.feedbacks.filter((item) => (
          item._id !== itemId
        ));
        this.toastr.success('Deleted the feedback successfully.', 'Success'); return;
      }
      this.toastr.error(response.message, 'error');
    });
  }

  onUpvote(itemId: string) {

    let data = {
      feedback_id : itemId,
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'UpdateFeedbackVotes', data, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        let userId = this.token.getUserId();
        this.feedbacks = this.feedbacks.map((item) => {
          if (item._id === itemId) {
            item.votes.push(userId);
          }
          return item;
        });
        this.toastr.success('Voted up successfully.', 'Success'); return;
      } 
        this.toastr.error(response.message, 'Fail');
    });
  }

  CreateComment(formData: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'CreateFeedbackComment', formData, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        let strCommentId = response.data._id;
        this.clickedComment.comments.push(strCommentId);
        this.clickedComment.feedback_comments.splice(0, 0, response.data);
        this.toastr.success('Created comment successfully.', 'Success'); return;
      } 
      this.toastr.error(response.message, 'Fail');
    });
  }

  CreateSubComment(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'CreateSubComment', formData, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.clickedComment.feedback_comments.map((item:any,i:number) => {
          if (item._id === formData.get('comment_id')) {
            item.sub_comments.push(response.data);
          }
        });
        this.toastr.success('Created subComment successfully.'); return;
      } 
      this.toastr.error(response.message, 'Fail');
    });
  }

  UpdateComment(formData: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'UpdateFeedbackComment', formData, httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.clickedComment.feedback_comments = this.clickedComment.feedback_comments.map((item:any) => {
          if (item._id === formData.get('id')) {
            item.comment = formData.get('comment');
            item.updated_at = response.data.updated_at;
            item.file = response.data.file;
          }
          return item;
        });
        this.toastr.success('Updated the comment successfully.', 'Success'); return;
      }
      this.toastr.error('Failed Comment update.', 'Fail');
    });
  }

  UpdateSubComment(formData: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.post<any>(this.api + 'UpdateSubComment', formData, httpOptions)
    .subscribe((response) => {
      console.log(response)
      if (response.result) {
        this.clickedComment.feedback_comments = this.clickedComment.feedback_comments.map((item:any) => {
          item.sub_comments.map((item: any) => {
             if (item._id === formData.get('id')) {
                item.content = formData.get('content');
                item.updated_at = response.data.updated_at;
                item.file = response.data.file;
             }
             return item;
           })          
           return item;
         });
        this.toastr.success('Updated the sub-comment successfully.', 'Success'); return;
      }
      this.toastr.error('Failed sub-comment update.', 'Fail');
    });
  }

  deleteFeedbackComment (commentId: string) {

    let data = {
      'comment_id' : commentId,
    }

    const httpOptions = {
      body: data,
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.delete<any>(this.api + 'DeleteFeedbackComment', httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.commentsByFeedback = this.commentsByFeedback.filter((item:any) => (
          item._id !== commentId
        ));
        this.clickedComment.feedback_comments = this.commentsByFeedback;
        this.toastr.success('Deleted the FeedbackComment successfully.', 'Success'); return;
      }
      this.toastr.error(response.message, 'error');
    });
  }

  deleteFeedbackSubComment (subcommentId: string) {
    
    let data = {
      'subcomment_id' : subcommentId,
    }

    const httpOptions = {
      body: data,
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    this.http.delete<any>(this.api + 'DeleteSubComment', httpOptions)
    .subscribe((response) => {
      if (response.result) {

        this.commentsByFeedback = this.commentsByFeedback.map((item:any) => {
          item.sub_comments = item.sub_comments.filter((item:any) => (
            item._id !== subcommentId
          ))
          return item;
        })
        this.clickedComment.feedback_comments = this.commentsByFeedback;
        this.toastr.success('Deleted the FeedbackSubComment successfully.', 'Success'); return;
      }
      this.toastr.error(response.message, 'error');
    });
  }

  getNotify() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };

    let data = {
      'user_id' : this.token.getUserId()
    }
  
    this.http.post<any>(this.api + 'GetNotify', data,  httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.notifyInfo = response.data;
        this.notifyInfoCount = response.data.feedbacks.length + response.data.feedbackcomments.length;
      }
    });
  }

  checkNotify(formatDate:FormData) {
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`})
    };
    this.http.post<any>(this.api + 'CheckNotify', formatDate,  httpOptions)
    .subscribe((response) => {
      if (response.result) {
        this.notifyInfoCount = 0;
        this.stopCheckNotify = true;
      }
    });
  }

  // Search Comment by id
  // getById(id: number): PostType | undefined {
  //   return this.getAllComments.find((p) => p.id === id);
  // }

  getAllComments : any = []; 
  returnNComments(num: number) {
    if (num === 0 || num >= this.getAllComments.length) {
      return this.getAllComments;
    }
    let arr: any = [];
    for (let i = 0; i < num; i++) {
      arr.push(this.getAllComments[i]);
    }
    return arr;
  }

  // temp method for demonstration subcomments system work
  openSubcomments(id: string) {

    this.clickedComment = this.feedbacks.find((p) => p._id === id);

    this.commentsByFeedback = this.clickedComment.feedback_comments;
    //newest sort
    this.commentsByFeedback.sort(function(a: any, b: any){
      return +new Date(b.updated_at) - +new Date(a.updated_at)
    });

    this.allCommentsVisible = false;
  }

  returnToAllComments(): void {
    this.allCommentsVisible = true;
  }
}
