import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';
import { ProductDto } from '../models/product';
import { ChatService } from '../services/chat.service';
import { ProductService } from '../services/product.service';

interface ChatLine {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealOnScrollDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  /** Russian copy as Unicode escapes for reliable encoding in tooling. */
  readonly t = {
    heroLead:
      '\u041c\u043e\u0434\u0430, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0442\u0435\u0431\u044f \u0441\u043b\u044b\u0448\u0438\u0442. \u041f\u0435\u0440\u0432\u044b\u0439 \u0418\u0418-\u043c\u0430\u0440\u043a\u0435\u0442\u043f\u043b\u0435\u0439\u0441, \u0433\u0434\u0435 \u043f\u043e\u0438\u0441\u043a \u0437\u0430\u043c\u0435\u043d\u0435\u043d \u0436\u0438\u0432\u044b\u043c \u0434\u0438\u0430\u043b\u043e\u0433\u043e\u043c.',
    advantagesTitle:
      '\u041f\u0420\u0415\u0418\u041c\u0423\u0429\u0415\u0421\u0422\u0412\u0410',
    advantagesBody:
      '\u041e\u0431\u044b\u0447\u043d\u044b\u0435 \u0441\u0430\u0439\u0442\u044b \u0437\u0430\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0442 \u0442\u0435\u0431\u044f \u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u043c\u0438. BESPEAK \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u043d\u0430 \u0442\u0435\u0431\u044f. \u041e\u0434\u043d\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0432\u043c\u0435\u0441\u0442\u043e \u0442\u044b\u0441\u044f\u0447\u0438 \u043a\u043b\u0438\u043a\u043e\u0432.',
    audienceBlock:
      '\u0414\u041b\u042f \u0422\u0415\u0425, \u041a\u0422\u041e \u0426\u0415\u041d\u0418\u0422 \u0412\u0420\u0415\u041c\u042f. \u0414\u041b\u042f \u0422\u0415\u0425, \u041a\u0422\u041e \u0418\u0429\u0415\u0422 \u0421\u0422\u0418\u041b\u042c. \u0414\u041b\u042f \u0422\u0415\u0425, \u041a\u041e\u041c\u0423 \u041d\u0423\u0416\u0415\u041d \u0420\u0415\u0417\u0423\u041b\u042c\u0422\u0410\u0422, \u0410 \u041d\u0415 \u0411\u0415\u0421\u041a\u041e\u041d\u0415\u0427\u041d\u042b\u0419 \u0421\u041a\u0420\u041e\u041b\u041b.',
    chatIntro:
      '\u042f \u043f\u043e\u0434\u0431\u0435\u0440\u0443 \u0434\u043b\u044f \u0432\u0430\u0441 \u043e\u0431\u0440\u0430\u0437. \u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u043e\u0432\u043e\u0434.',
    chatPlaceholder:
      '\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: BLACK TIE \u0423\u0416\u0418\u041d',
    btnFind: '\u041d\u0430\u0439\u0442\u0438',
    techTitle:
      '\u0422\u0415\u0425. \u0423\u041d\u0418\u041a\u0410\u041b\u042c\u041d\u041e\u0421\u0422\u042c',
    founder1:
      '\u0410\u0411\u0418\u041b\u042c\u0414\u0410 \u0410\u0417\u0410\u041c\u0410\u0422 (CEO)',
    founder2:
      '\u0421\u0423\u0419\u041d\u0423\u041b\u0410\u0415\u0412 \u0415\u0420\u041d\u0410\u0420 (CTO)',
    userPrefix: '\u0412\u042b: ',
    chatErrorFallback:
      '\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 OPENAI_API_KEY \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435.',
  };

  messages: ChatLine[] = [];
  chatInput = '';
  products: ProductDto[] = [];
  gridUpdating = false;

  constructor(
    private readonly chatApi: ChatService,
    private readonly productApi: ProductService
  ) {}

  ngOnInit(): void {
    this.messages = [{ role: 'assistant', text: this.t.chatIntro }];
    this.loadProducts();
  }

  formatPrice(product: ProductDto): string {
    if (product.display_price === null || product.display_price === undefined) {
      return '\u2014';
    }
    return String(product.display_price);
  }

  loadProducts(): void {
    this.productApi.list().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit(): void {
    const text = this.chatInput.trim();
    if (!text) return;

    this.messages.push({ role: 'user', text });
    this.chatInput = '';

    const history = this.messages.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.text,
    }));

    this.chatApi.send(text, history).subscribe({
      next: (res) => {
        this.messages.push({ role: 'assistant', text: res.reply });
        this.refreshProducts();
      },
      error: (err) => {
        const detail = err?.error?.detail ?? this.t.chatErrorFallback;
        this.messages.push({ role: 'assistant', text: String(detail) });
      },
    });
  }

  private refreshProducts(): void {
    this.gridUpdating = true;
    setTimeout(() => {
      this.productApi.list().subscribe((data) => {
        this.products = data;
        this.gridUpdating = false;
      });
    }, 380);
  }
}
// 