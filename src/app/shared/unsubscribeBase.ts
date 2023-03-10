import { Subject } from 'rxjs';

export class UnsubscribeBase {
  destroy$$ = new Subject();
}
