import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates.subscribe((event) => {
      this.showAppUpdateAlert();
      this.doAppUpdate();
    });
  }
  showAppUpdateAlert() {
    const message = 'De applicatie heeft een update';
    alert(message);
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
