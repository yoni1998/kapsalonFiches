import { UpdateService } from './services/update.service';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private update: UpdateService
  ) {
    this.update;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
