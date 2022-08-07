import { Component, OnInit } from '@angular/core';
import { DataCommentsService } from 'src/app/shared/services/data-comments.service';
import { PopupsServiceService } from 'src/app/shared/services/popups-service.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  sortType: string = 'Top';

  sortTypes: string[] = ['My Own', 'Top', 'New'];
  filterTypes: string[] = [
    'Under Review',
    'Planned',
    'In Progress',
    'Complete',
  ];

  constructor(
    public popupsService: PopupsServiceService,
    public data: DataCommentsService
  ) {}

  ngOnInit(): void {}

  chooseSortType(item: string): void {
    this.sortType = item;
  }
}
