import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { FileType, FileData, FileSize, DefaultMaxFileSize, DefaultExpectedFileTypes } from './file-upload.model';
import { forkJoin, Observable } from 'rxjs';
import { Guid } from 'src/app/core/extensions/guid-extensions';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() text = 'Upload file';
  @Input() maxFileSize: number;
  @Input() expectedFileTypes: string[];
  @Input() fileType: FileType = FileType.All;
  @Input() imageWidth: number;
  @Input() imageHeight: number;
  @Input() allowMultiple = false;
  @Input() icon = false;
  @Input() enabled = true;

  @Output() onFileSelected: EventEmitter<FileData[]> = new EventEmitter<FileData[]>();
  @ViewChild('fileInput', { static: true }) fileInputElementRef: ElementRef;

  private fileInput: HTMLInputElement;


  constructor() { }

  ngOnInit() {
    this.fileInput = this.fileInputElementRef.nativeElement;

    if (!this.maxFileSize) {
      this.maxFileSize = DefaultMaxFileSize;
    }

    if (!this.expectedFileTypes) {
      this.expectedFileTypes = DefaultExpectedFileTypes;
    }
  }

  onFileSelect() {
    if (this.fileInput.files && this.fileInput.files.length > 0) {

      const subscriptions = new Array<Observable<string[]>>();
      for (let i = 0; i < this.fileInput.files.length; i++) {
        const file = this.fileInput.files[i];
        subscriptions.push(this.validateFileAsync(file));
      }

      forkJoin(subscriptions).subscribe(results => {
        let files: FileData[] = [];
        for (let i = 0; i < results.length; i++) {

          const fileData: FileData = <FileData>{};
          const file = this.fileInput.files[i];

          if (results[i].length === 0) {
            fileData.previewUrl = URL.createObjectURL(file);
            fileData.fileName = file.name;
            fileData.fileID = Guid.newGuid();
            fileData.rawFile = file;
          }

          fileData.validationErrors = results[i];
          files = [...files, fileData];
        }

        this.onFileSelected.emit(files);
        this.fileInput.value = '';

      });
    }
  }

  validateFileAsync(file: File): Observable<string[]> {
    return Observable.create(observer => {
      const extension = this.getFileNameExtension(file.name);

      if (this.expectedFileTypes.indexOf(extension.toLowerCase()) < 0) {
        if (this.fileType === FileType.Image) {
          observer.next(['Invalid Image Format']);
        } else {
          observer.next(['Invalid File Type']);
        }

        observer.complete();
      } else if (this.fileType === FileType.Image && this.imageWidth && this.imageHeight) {
        const img = new Image();
        const that = this;

        img.src = window.URL.createObjectURL(file);
        img.onload = function () {
          const width = img.naturalWidth, height = img.naturalHeight;
          window.URL.revokeObjectURL(img.src);
          if (width !== that.imageWidth && height !== that.imageHeight) {
            observer.next(['Invalid Image Dimensions']);
            observer.complete();
          } else {
            observer.next([]);
            observer.complete();
          }
        };
      } else if (file.size > this.maxFileSize) {
        let limitedFileSize = '';
        switch (this.maxFileSize) {
          case (FileSize.$2Mb): {
            limitedFileSize = '2MB';
            break;
          }
          case (FileSize.$10Mb): {
            limitedFileSize = '10MB';
            break;
          }
        }
        observer.next(['Invalid File Size']);
        observer.complete();
      } else {
        observer.next([]);
        observer.complete();
      }
    });
  }

  private getFileNameExtension(name) {
    const chunks = name.split('.');
    return chunks[chunks.length - 1];
  }

}
