import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LooseObject } from 'src/app/shared/utils/common-functions';
@Component({
  selector: 'app-faq-master-form',
  templateUrl: './faq-master-form.component.html',
  styleUrls: ['./faq-master-form.component.scss']
})
export class FaqMasterFormComponent implements OnInit {



  form: UntypedFormGroup;
  @Input() title: string = '';
  @Input() id;
  @Output() formSubmitted = new EventEmitter();
  @Input() data;

  @Input() editData;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService) {
    // Validators.pattern("^ @]*@[^ @]*")
    this.form = this.fb.group({
      'question': ['', Validators.required],
      'answer': ['', Validators.required],
      'description': [''],
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
      'question': this.data.question || '',
      'answer': this.data.answer || '',
      'description': this.data['description'] || '',
    });
  }

  onSubmit() {

    if (this.form.valid) {
      var formData: LooseObject = {};
      formData = this.form.value;
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

}
