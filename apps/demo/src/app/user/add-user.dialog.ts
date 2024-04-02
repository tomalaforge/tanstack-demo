import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { injectCreateUser } from './user.query';

@Component({
  selector: 'add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <form
        [formGroup]="form"
        class="flex flex-col gap-2"
        (ngSubmit)="addUser()"
      >
        <input
          type="text"
          formControlName="name"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          formControlName="age"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <button class="btn" type="submit">Add User</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  close = output();
  private createUser = injectCreateUser();

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    age: new FormControl(0, { nonNullable: true }),
  });

  addUser() {
    if (this.form.invalid) {
      return;
    }

    this.createUser.mutate(this.form.getRawValue());

    this.close.emit();
  }
}
