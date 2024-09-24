import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlidebarComponent {
  isOpen = false;
  @Input() sliderId!: number;
  @Input() sliderData: any;
  @Input() programmingFundamentals: any;

  ngOnInit() {
  }


  toggleSlider(): void {

    this.isOpen = !this.isOpen;
  }
  getSliderContent(sliderType: string): any {
    return this.sliderData ? this.sliderData[sliderType] : null;
  }


}
