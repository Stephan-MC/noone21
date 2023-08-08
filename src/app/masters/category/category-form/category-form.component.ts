import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { RequestService } from 'src/app/shared/services/request.service';
import { LooseObject } from 'src/app/shared/utils/common-functions';
import { CategoryUrl } from '../category-url.enum';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {


  form: UntypedFormGroup;
  @Input() title: string = '';
  @Input() id;
  @Output() formSubmitted = new EventEmitter();
  @Input() data;

  @Input() editData;

  disableButton = false;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private toasterService: ToastrService,
    private requestService: RequestService,
    private toastrService: ToastrService) {
    // Validators.pattern("^ @]*@[^ @]*")
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'description': [''],
      'media_id': [''],
      'is_home': [0],
    });


  }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.editData) {
      console.log("Edit Data", this.editData);
      this.data = this.editData;
      this.responseData();
    }
  }

  responseData() {
    this.form.patchValue({
      'name': this.data.name || '',
      'description': this.data['description'] || '',
      'is_home': this.data['is_home'] ? true : false,
    });
  }

  onSubmit() {

    if (this.form.valid && !this.disableButton) {
      var formData: LooseObject = {};
      formData = this.form.value;
      formData['is_home'] = formData['is_home'] ? 1 : 0;
      if (this.id == undefined) {
        this.add(formData);
      }
      else {
        formData['id'] = this.id;
        this.update(formData);
      }
    }
    else {
      this.toastrService.error("Please try again! Something went wrong", "Error");
    }
  }

  add(formData) {
    this.formSubmitted.emit(formData);
  }

  update(formData) {
    this.formSubmitted.emit(formData);
  }


  closeForm() {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }


  public fileChangeEvent(fileInput: any) {
    console.log("EditProfileComponent -> fileChangeEventProfile -> fileInput", fileInput);
    var files = fileInput.target.files[0];

    this.disableButton = true;
    let fileStatus = this.uploadFile(files);
    console.log("PropertyFormComponent -> fileChangeEventProperty -> addPropertyStatus", fileStatus)
    let self = this;
    fileStatus.then((res) => {
      if (res && res.status) {
        this.disableButton = false;
        this.toastrService.success(res.message, "File");
        self.form.get('media_id').setValue(res.result.data.id);
        if (!self.data) {
          self.data = {};
          self.data['media'] = res.result.data;
        }
      } else {
        this.disableButton = false;
      }
    }).catch((error) => {
      console.log("Promise rejected with ", error);
      this.disableButton = false;
      this.toasterService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    });
  }

  async uploadFile(file): Promise<any> {
    if (this.form.valid) {
      var formData: FormData = new FormData();
      formData.append('media', file);
    }
    let result = await this.requestService.sendRequest(CommonUrls.MEDIA_ADD, 'post', formData).toPromise();
    return result;
  }

}
