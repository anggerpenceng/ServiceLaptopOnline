import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('ServiceLaptop');
    //JQuery Function
    $(document).ready(function () {
      let config1 =  ($('#endless').offset().top - ($('.navup').height() + 20));
      let config2 =  ($('#toWhite').offset().top - ($('.navup').height() + 20));
      $(window).scroll(function () {
        if ($(window).scrollTop() >= config1 && $(window).scrollTop() <= config2) {
          $('.navup').css({
            "color" : "rgb(101, 101, 101)"
          });
        }
        else if($(window).scrollTop() >= config2){
          $('.navup').css({
            "color" : "white"
          });
        }
        else{
          $('.navup').css({
            "color" : "white"
          });
        }
      });
      $('#window').click(function () {
        $('.boxnav').css({
          "display" : "block"
        });
      })
      $('.fronthead , #endless , .item , #toWhite').click(function () {
        $('.boxnav').css({
          "display" : "none"
        });
      })
    })
  }

}
