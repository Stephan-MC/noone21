import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-doctor-tips',
  templateUrl: './doctor-tips.component.html',
  styleUrls: ['./doctor-tips.component.scss']
})
export class DoctorTipsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      $(".card a.vmbtn").click(function (e) {
        e.preventDefault();

        $(this).parents(".card").find(".card-body ul.tipsbox li.hd").slideToggle();

      })

    }, 500);
  }

}
