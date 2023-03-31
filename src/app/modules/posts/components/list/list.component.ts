import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Post } from '../../models/Post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  sub: Subscription | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.sub = this.postService
      .getPosts()
      .subscribe(
        (data: Post[]) => (this.posts = data.filter((f) => Number(f.id) < 11))
      );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
