import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsToDisplay: Post[] = [];
  sub!: Subscription;
  countPerPage = 10;
  activePage = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.sub = this.postService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.postsToDisplayHandler();
      },
      error: console.log,
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pageHandler = (value: any) => {
    this.activePage = value;
    this.postsToDisplayHandler();
  };

  postsToDisplayHandler = () => {
    const start = this.activePage === 1 ? 0 : (this.activePage - 1) * 10;
    this.postsToDisplay = this.posts.slice(start, start + this.countPerPage);
  };
}
