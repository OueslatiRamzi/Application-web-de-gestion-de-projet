import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilterClient'
})
export class MyFilterClientPipe implements PipeTransform {
  transform(objs: any, termm: any) {
    if (termm === undefined) {
      return objs
    }
    return objs.filter((obj: any) => {
      return obj.name.toLowerCase().includes(termm.toLowerCase()) || obj.numFacture.toLowerCase().includes(termm.toLowerCase()) || obj.valeurFacture.toLowerCase().includes(termm.toLowerCase()) || obj.valeurReglement.toLowerCase().includes(termm.toLowerCase()) || obj.moyenReglement.toLowerCase().includes(termm.toLowerCase())
    })
  }

}
