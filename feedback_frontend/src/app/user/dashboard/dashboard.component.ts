import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';
import { ResizeEvent } from 'angular-resizable-element';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() id: any;
  selectedCompany: any;

  constructor(
    private route: ActivatedRoute,
    private selectService: UserSelectService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    //console.log(this.id);
    this.route.params.subscribe(data => {
      //this.selectedCompany = data['id'];
      this.selectService.getCompanyDetails(data['id']).subscribe(data => {
        this.selectedCompany = data[0];
      });
    });
  }

  public style: object = {};

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  test() {
    console.log('test');
  }


  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target || undefined,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
        },
        reject: () => {
            //reject action
        }
    });
}

}
