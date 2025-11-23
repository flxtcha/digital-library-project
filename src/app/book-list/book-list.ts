import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GoogleBooksService } from '../services/google-books-service';
import { ActivatedRoute } from '@angular/router';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll'

export interface Book {
  id: string;
  title: string;
  imgSource: string;
  description: string;
}

type Category = 'popular' | 'new' | 'coming-soon' | 'all';

@Component({
  selector: 'app-book-list',
  imports: [InfiniteScrollDirective],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList //implements OnInit
{
  private route = inject(ActivatedRoute);
  private googleBookService = inject(GoogleBooksService);
  books = signal<Book[]>([]);
  private startIndex = signal(0);
  private maxResults: number = 10; 

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    const category = this.route.snapshot.data['category'] as Category;
      this.googleBookService.getVolumeByCategory(category, this.startIndex(), this.maxResults).subscribe({
        next: (response: any) => {
          const mapped = (response.items || []).map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            imgSource: item.volumeInfo.imageLinks?.thumbnail || '',
            description: item.volumeInfo.description
          }));
          this.books.update(prev => [...prev, ...mapped]);
        },
        error: err => {
    
        }
      });
      this.startIndex.update(x => x + this.maxResults);
  }
}