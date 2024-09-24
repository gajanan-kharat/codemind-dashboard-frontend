import { Component ,ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss'],
})
export class SuccessStoriesComponent {

  videoSlides  : OwlOptions = {
    nav: true,
    dots: false,
    autoplayHoverPause: false,
    margin: 30,
    navText: ['<', '>'],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };

  videos: {src: SafeResourceUrl}[];
  isPopupOpen = false;
  currentVideoSrc: SafeResourceUrl | null = null;
  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      { src: this.getSafeUrl('https://www.youtube.com/embed/Yxiv1KQQ-9c?si=mAPmIuvs8mL5dQXb') },
      { src: this.getSafeUrl('https://www.youtube.com/embed/a46KZtv1gaQ?si=8t4Uk1VeEY46wKum') },
      { src: this.getSafeUrl('https://www.youtube.com/embed/1c2Ut8Km2oo?si=roySfIMXqiJB_SkJ') },
      { src: this.getSafeUrl('https://www.youtube.com/embed/P9iIfrMkHAs?si=_4F-dk_VdEBhjscI') },
      { src: this.getSafeUrl('https://www.youtube.com/embed/PqfVoMNWa1s?si=4LDAJ5bZzZ0rVJns') }
    ];
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}
