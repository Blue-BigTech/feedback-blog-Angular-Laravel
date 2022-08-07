import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { SheetService } from 'src/app/shared/refreshers/sheet.service';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';
import { FileService } from 'src/app/shared/services/files/file.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  @Input() row: any;

  exceltoJson: any = {};

  token: string = '';
  user: User = new User();
  selectedTabId: string = '';

  company: any;
  init: boolean = true;

  saveInitSheetForm!: FormGroup;
  mainSheetForm!: FormGroup;
  displaySheetNameModal!: boolean;

  files: any[] = [];
  position: string = '';

  selectedLightTheme: any = 'atom-theme';
  selectedDarkTheme: any = 'atom-theme';
  selectedThemeMode: any = 'light';

  constructor(
    private fileservice: FileService,
    private userdata: UserDataService,
    private userSelect: UserSelectService,
    private fb: FormBuilder,
    private sheetRefresher: SheetService,
    private themeRefresher: ThemeService,
  ) {

    this.saveInitSheetForm = this.fb.group({
      user_id: [''],
      tab_id: [''],
      company_id: [''],
      file_name: [''],
      init_file: ['']
    });
    this.mainSheetForm = this.fb.group({
      user_id: [''],
      tab_id: [''],
      company_id: [''],
      file_name: ['', Validators.required],
      init_file: ['']
    });
  }

  ngOnInit(): void {
    this.selectedLightTheme = localStorage.getItem('activeLightTheme');
    this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
    this.selectedThemeMode = localStorage.getItem('themeMode');

    this.themeRefresher.getMessage().subscribe((res) => {
      this.selectedLightTheme = localStorage.getItem('activeLightTheme');
      this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
      this.selectedThemeMode = localStorage.getItem('themeMode');
    });

    this.selectedTabId = localStorage.getItem('selected_Tab')+'';

    this.token = localStorage.getItem('token')+'';
    this.userdata.getCurrentUser(this.token).subscribe((data) => {
      this.user = data;
      //console.log(this.user._id)
      this.fileservice.SelectUserCompanySheets(this.user._id, this.row.company_id).subscribe(res => {
        if(res.length == 0) {
          //select the main sheet of the selected company
          this.userSelect.getCompanyDetails(this.row.company_id).subscribe(res => {
            //console.log(res);
            this.init = true;
            this.company = res[0];
            this.saveInitSheetForm.value.user_id = this.user._id;
            this.saveInitSheetForm.value.company_id = this.row.company_id;
            this.saveInitSheetForm.value.tab_id = this.selectedTabId;

            this.saveInitSheetForm.value.file_name = 'initial_'+this.company.name+'_Sheet';
            this.saveInitSheetForm.value.init_file = this.company.excel;
          })
          //console.log('iniiiit');
        } else {
          this.files = res;
          this.init = false;
          this.userSelect.getCompanyDetails(this.row.company_id).subscribe(res => {
            this.company = res[0];
          });
        }
      });
    });

    this.sheetRefresher.getMessage().subscribe(refresh => {
      this.fileservice.SelectUserCompanySheets(this.user._id, this.row.company_id).subscribe(res => {
        this.files = res;
      });
    });


    //Select the Files version of specific company SelectUserCompanySheets(user_id, company_id)
    //select Sheets where user_id && tab_id && company_id (company_id came from the row data:
    // ==> should update the splittedArea with the selected company_id)
  }

  onFileChange(event: any) {
    this.exceltoJson = {};
    let headerJson: any = {};
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    console.log("filename", target.files[0].name);
    this.exceltoJson['filename'] = target.files[0].name;
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      for (var i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        //console.log(data);
        this.exceltoJson[`sheet${i + 1}`] = data;
        const headers = this.get_header_row(ws);
        headerJson[`header${i + 1}`] = headers;
        //  console.log("json",headers)
      }
      this.exceltoJson['headers'] = headerJson;
      console.log(this.exceltoJson);
    };
  }

  get_header_row(sheet: any) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
      // console.log("cell",cell)
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
  }

  OpenFileNameModal(position: string) {
    this.position = position;
    this.displaySheetNameModal = true;
  }

  saveInitFile() {
    if(this.init) {
      this.fileservice.saveInitUserSheet(this.saveInitSheetForm.value).subscribe(res => {
        console.log(res);
      });
    } else {
      //this.displaySheetNameModal = true;
      this.mainSheetForm.value.user_id = this.user._id;
      this.mainSheetForm.value.company_id = this.row.company_id;
      this.mainSheetForm.value.tab_id = this.selectedTabId;
      this.mainSheetForm.value.init_file = this.company.excel;
      this.fileservice.saveInitUserSheet(this.mainSheetForm.value).subscribe(res => {
        console.log(res);
        this.sheetRefresher.setMessage('sheet copied!');
        this.mainSheetForm.reset()
        //this.displaySheetNameModal = true;
      });
    }
  }


  deleteSheetVersion(id: string) {
    this.fileservice.deleteSheetVersion(id).subscribe(res => {
      console.log(res);
      this.sheetRefresher.setMessage('sheet deleted');
    })
  }

  updateFileName(name: string, id: string) {
    this.fileservice.updateFileName(name, id).subscribe(res => {
      console.log(res);
      this.sheetRefresher.setMessage('sheet name updated');
    })

  }

  /* READ EXCEL FILE AND CONSOLE ITS DATA IN THE CLIENT SIDE */


}
