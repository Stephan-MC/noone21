import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { SEOService } from '../shared/services/seo.service';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {
  slug:string;
  pageContent:[];
  myArray=[
  {id:1,name:'karons'},
  {id:1,name:'karkkkons'},
  ];
    constructor(public router: Router,
      private route: ActivatedRoute,
      private toastrService: ToastrService,
      private requestService: RequestService,
      private seo: SEOService) {
      this.slug=this.route.snapshot.params["slug"];
      this.seo.setTitle(`${this.slug}`);
     }
    ngOnInit(): void {
     this.getpages();
  
    }
    setMeta(data){
      this.seo.setMetaTags(data.page_keywords,data.page_description);
       this.seo.setTitle(`${data.page_title}`);
    
    }
    getpages() {
      this.requestService.sendRequest('admin/dynamicPage/get', 'GET', {page_type:2,page_slug:this.slug}).subscribe(res => {
        if (res && res.status) {
          if(res.result.data[0]?.content){
            console.log('data one one');
            this.pageContent=res.result.data[0]?.content;
            this.setMeta(res.result.data[0]);
          }else{
            this.router.navigate(['/404'])
          }
          
        } else {
  
        }
      }, error => {
  
        this.toastrService.error(error.error ? error.error.message : error.message, 'success');
      })
    }

}
