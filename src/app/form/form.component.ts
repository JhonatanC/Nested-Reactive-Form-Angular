import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  services = [
    { id: 1, service: 'Servicio #1' },
    { id: 2, service: 'Servicio #2' },
    { id: 3, service: 'Servicio #3' },
    { id: 4, service: 'Servicio #4' },
    { id: 5, service: 'Servicio #5' },
  ];

  subservices = [
    { id: 1, subservice: 'Subservicio #1' },
    { id: 2, subservice: 'Subservicio #2' },
    { id: 3, subservice: 'Subservicio #3' },
    { id: 4, subservice: 'Subservicio #4' },
    { id: 5, subservice: 'Subservicio #5' },
  ];

  parts = [
    { id: 1, part: 'Part #1' },
    { id: 2, part: 'Part #2' },
    { id: 3, part: 'Part #3' },
    { id: 4, part: 'Part #4' },
    { id: 5, part: 'Part #5' },
  ];

  form: FormGroup;

  constructor( private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(){
    this.form = this.fb.group({
      servicesArray: this.fb.array([])
    })
  }

   servicesArray(){
    return this.form.get('servicesArray') as FormArray;
  }

  newService(){
    return this.fb.group({
      serviceName: '',
      servicePrice: '',
      subServices: this.fb.array([])
    });
  }

  addService(){
    this.servicesArray().push(this.newService());
    // console.log( (this.form.get('servicesArray') as FormArray).controls );
  }

  removeService(idx:number){
    this.servicesArray().removeAt(idx);
  }

  subServicesArray(idx:number){
    return this.servicesArray().at(idx).get('subServices') as FormArray;
  }

  newSubService(){
    return this.fb.group({
      subServiceName: '',
      subServicePrice: '',
      parts: this.fb.array([])
    });
  }
  
  addSubService(idx:number){
    this.subServicesArray(idx).push(this.newSubService());
    // console.log( (  (this.form.get('servicesArray') as FormArray).at(idx).get('subServices') as FormArray).controls  );
  }

  removeSubService(idxSer:number, idxSub:number){
    this.subServicesArray(idxSer).removeAt(idxSub);
  }

  partsArray(indexService: number, indexSubService: number){
    return (((this.form.get('servicesArray') as FormArray).at(indexService).get('subServices') as FormArray).at(indexSubService).get('parts') as FormArray).controls;
  }

  newPartArray(){
    return this.fb.group({
      subPartServiceName: '',
      subPartServicePrice: ''
    });
  }

  addPartSubService(indexService: number, indexSubService: number){
    this.partsArray(indexService, indexSubService).push(this.newPartArray());
    // console.log( (((this.form.get('servicesArray') as FormArray).at(indexService).get('subServices') as FormArray).at(indexSubService).get('parts') as FormArray).controls )
  }

  // Remover sub servicio
  // removePartSubService(idSub:number, idPart:number){
  //   this.partsArray(idSub).removeAt(idPart);
  // }

  solicitarServicio(){
    // console.log(this.form );

    // if( this.form.invalid ){

    //   return Object.values( this.form.controls ).forEach( control  =>{
    //     if( control instanceof FormGroup ){
    //       Object.values( control.controls ).forEach( control => {
    //         control.markAsTouched();
    //       });
    //     } else {
    //       control.markAsTouched();
    //     }
    //   });
    // }

    // Re establecer valores después de enviar la información
    console.log(this.form.value);
    this.form.reset();


  }

}
