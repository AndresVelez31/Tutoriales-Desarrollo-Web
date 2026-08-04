import type { Request, Response } from "express";
import { books } from '../data/books.js';
import { Book } from '../models/Book.js';

export class HomeController {
  static index(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Home";
    
    res.render('home/index', {viewData : viewData});
  }

  static about(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "About";

    res.render('home/about', {viewData : viewData});
  }

  static books(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Books";
    viewData["books"] = books;

    res.render('home/books', { viewData : viewData});
  }

  static show(req: Request, res: Response): void {
    const rawId = req.params.id;
    const id = typeof rawId === 'string' ? parseInt(rawId) : NaN;

    if (isNaN(id)) {
      res.status(400).render('home/index', { viewData: { title: 'Bad Request' } });
      return;
    }

    const book = Book.findById(books, id);

    if (!book) {
      res.status(404).render('home/index', { viewData: { title: 'Not Found' } });
      return;
    }

    res.render('home/show', { book : book});
  }

  static contact(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Contact";

    res.render('home/contact', {viewData : viewData});
  }
}