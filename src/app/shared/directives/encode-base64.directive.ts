import { Directive, output } from '@angular/core';

@Directive({
  selector: 'input[type=file][encodeBase64]',
  standalone: true,
  host: {
    '(change)': 'encodeFile($event)' // Vincula el elemento change del imput para que llame al método anterior. Hay que ponerle el $event para poder mandarlo.
  },
})

export class EncodeBase64Directive {

    encoded = output<string>(); // Emite el archivo serializado a base64
  
      encodeFile(event: Event) { // Transforma el archivo del elemnto a base64 y lo emite. 
        const fileInput = event.target as HTMLInputElement; 
        if (!fileInput.files?.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', () => {
          this.encoded.emit(reader.result as string);
        });
      }
    }


