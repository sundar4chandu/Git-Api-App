import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], keyword: any): any[] {
    if (!items) return [];
    if (!keyword) return items;
    return items.filter(item => {
      var itemFound: Boolean;
      if (item.commit.author.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        itemFound = true;
      };
      if (item.commit.message.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        itemFound = true;
      };      
      return itemFound;
    });

  }

}
