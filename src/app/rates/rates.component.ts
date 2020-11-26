import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  coins : any = [];
  temp : any = [];
  selected : any = [];
  fav : any = [];
  
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  
  @ViewChild('myTable') myTable!: DatatableComponent;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      let mappedArray = Object.keys(data).map(key => (data[key]));
      this.coins = mappedArray;
      this.temp = mappedArray;
      console.log(mappedArray);
    })  
  }

  updateFilter($event : any) {
    const val = $event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d : any) {
      return d.name.toLowerCase().indexOf(val) !== -1
      || d.symbol.toLowerCase().indexOf(val) !== -1 
      || d.rate.toString().indexOf(val) !== -1
      || !val;
    });

    // update the rows
    this.coins = temp;
    // Whenever the filter changes, always go back to the first page
    this.myTable.offset = 0;
  }

  onSelect({ selected } : { selected:any }) {
    console.log('Select Event', selected, this.selected);
    // console.log(this.coins.find(function(e){ return e.name == 'Aave' }));
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.fav = this.selected;
  }
}
