import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: number | undefined;
  editForm!: FormGroup;
  post!: Post;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: PostService
  ) {}
  ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => (this.id = id),
      error: console.error,
    });

    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
      userId: ['', [Validators.required]],
    });
    this.service.getPostById(Number(this.id)).subscribe({
      next: (value: Post) => this.editForm.patchValue(value),
      error: console.error,
    });
  }

  save(): void {
    this.loading = true;
    this.service.updatePost({ id: this.id, ...this.editForm.value }).subscribe({
      next: () => {
        this.loading = false;
      },
      error: console.error,
    });
  }
}
