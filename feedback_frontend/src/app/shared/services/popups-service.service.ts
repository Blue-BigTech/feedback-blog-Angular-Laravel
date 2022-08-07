import { Injectable } from '@angular/core';
import { DataCommentsService } from './data-comments.service';

@Injectable({
  providedIn: 'root',
})
export class PopupsServiceService {
  displayFeedbackPopup: boolean = false;
  displayProfilePopup: boolean = false;

  visibleFeedbackWindow: boolean = false;
  visibleProfileWindow: boolean = false;

  // for Feedback Popup Tabs
  activeFeedbackTab: string = 'bugs & errors';

  feedbackFormTitle: string = 'Report a Bug or Issue';

  constructor(public data: DataCommentsService) {}

  // open Feedback Popup Tabs
  openFeedbackTab(tab: string): void {
    this.activeFeedbackTab = tab;

    this.data.allCommentsVisible = true;

    if (tab === 'bugs & errors') {
      this.feedbackFormTitle = 'Report a Bug or Issue';
    }

    if (tab === 'feature requests') {
      this.feedbackFormTitle = 'Request New Feature';
    }

    if (tab === 'questions') {
      this.feedbackFormTitle = 'Create a Post';
    }
  }
}
