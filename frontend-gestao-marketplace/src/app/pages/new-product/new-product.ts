import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct {
  productImageBase64 = '';
  successMessage = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  private readonly _productsService = inject(ProductsService);

  saveProduct() {
    if (this.productForm.invalid || !this.productImageBase64) return;

    const newProduct: INewProductRequest = {
      title: this.productForm.value.title as string,
      description: this.productForm.value.description as string,
      price: Number(this.productForm.value.price),
      category: this.productForm.value.category as string,
      imageBase64: this.productImageBase64,
    };

    this._productsService
      .saveProduct(newProduct)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.productForm.reset();
          this.productImageBase64 = '';
        },
        error: (error) => {
          console.error('Erro ao salvar o produto:', error);
        },
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.convertFileTobase(file);
    }
  }

  convertFileTobase(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target?.result as string;
      this.productImageBase64 = imageBase64;
    };
    reader.onerror = (error) => {
      this.productImageBase64 = '';
      console.error('Error: ', error);
    };
    reader.readAsDataURL(file);
  }
}
