import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct {
  productImageBase64 = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  saveProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      console.log('Produto salvo com sucesso:', productData);
    } else {
      console.log('Formulário inválido');
    }
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
      console.log('Imagem em Base64:', imageBase64);
    };
    reader.onerror = (error) => {
      this.productImageBase64 = '';
      console.error('Error: ', error);
    };
    reader.readAsDataURL(file);
  }
}
