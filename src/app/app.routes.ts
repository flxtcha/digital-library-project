import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';

export const routes: Routes = [
    {   path: '', 
        redirectTo: 'all', 
        pathMatch: 'full' 
    },
    {
        path: 'popular',
        component: BookList,
        data: {
            category: 'popular'
        }
    },
    {
        path: 'new',
        component: BookList,
        data: {
            category: 'new'
        }
    },
    {
        path: 'coming-soon',
        component: BookList,
        data: {
            category: 'coming-soon'
        }
    },
    {
        path: 'all',
        component: BookList,
        data: {
            category: 'all'
        }
    }
];