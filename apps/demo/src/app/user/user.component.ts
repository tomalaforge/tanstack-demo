import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectUsers } from './user.query';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  template: `
    @if(queryUsers.isLoading()){
    <div>Loading...</div>
    } @else if (queryUsers.isError()) {
    <div>Error: {{ queryUsers.error() }}</div>
    } @else {
    <div>
      @for(user of queryUsers.data(); track user.id) {
      <div>{{ user.name }}</div>
      }
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  queryUsers = injectUsers();
}
