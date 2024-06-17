import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(objs: any, term: any) {
    if (term === undefined) {
      return objs
    }
    return objs.filter((obj: any) => {
      return obj.name.toLowerCase().includes(term.toLowerCase()) || obj.produits.toLowerCase().includes(term.toLowerCase()) || obj.promotion.toLowerCase().includes(term.toLowerCase()) || obj.contactPromoteur.toLowerCase().includes(term.toLowerCase()) || obj.zone.toLowerCase().includes(term.toLowerCase()) || obj.bureauDetude.toLowerCase().includes(term.toLowerCase()) || obj.installateur.toLowerCase().includes(term.toLowerCase()) || obj.contactInstallateur.toLowerCase().includes(term.toLowerCase()) || obj.avancement.toLowerCase().includes(term.toLowerCase()) || obj.dateVisite.toLowerCase().includes(term.toLowerCase())
    })


  }

}
