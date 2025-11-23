import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { GoogleBooksService } from '../services/google-books-service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'

export interface Book {
  id: string;
  title: string;
  imgSource: string;
  description: string;
  previewLink: string;
}

type Category = 'popular' | 'new' | 'coming-soon' | 'all';

@Component({
  selector: 'app-book-list',
  imports: [InfiniteScrollDirective],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  private route = inject(ActivatedRoute);
  private googleBookService = inject(GoogleBooksService);

  /** Writable signals for user-driven state */
  private startIndex = signal(0);
  private readonly maxResults = 10;

  /** Category from route as a signal */
  readonly category = toSignal<Category>(
    this.route.data.pipe(map(d => (d['category'] ?? 'all') as Category)),
  );

  /** Derived query state using computed */
  readonly query = computed(() => ({
    category: this.category(),
    startIndex: this.startIndex(),
    maxResults: this.maxResults,
  }));

  /** Books list */
  books: WritableSignal<Book[]> = signal([]);

  constructor() {
    /**
     * Fetch books whenever query changes.
     * This is a side effect (API call), so it's okay to subscribe here.
     */
    toObservable(this.query)
      .pipe(
        switchMap(q =>
          this.googleBookService.getVolumeByCategory(q.category || 'all', q.startIndex, q.maxResults)
        )
      )
      .subscribe((response: any) => {
        const q = this.query();
        const items = response.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          imgSource: item.volumeInfo.imageLinks?.thumbnail ?? '',
          description: item.volumeInfo.description ?? '',
          previewLink: item.volumeInfo.previewLink ?? '',
        })) ?? [];

        if (q.startIndex === 0) {
          this.books.set(items);
        } else {
          this.books.update(prev => [...prev, ...items]);
        }
      });
  }

  /** User action: load more */
  loadMore(): void {
    this.startIndex.update(i => i + this.maxResults);
  }

  getBookPreview(id: string) {
    const preview = this.books().find(book => book.id === id)?.previewLink;
    console.log(preview);
    window.open(preview);
  }
}