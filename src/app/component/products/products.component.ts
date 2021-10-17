import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
public productlist:any;
public filterCaregory:any;
searchKey:string='';
  constructor(private api:ApiService,private cartservice:CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res=>{
      this.productlist=res;
      this.filterCaregory=res;
      this.productlist.forEach((a:any) => {
        if (a.category ==="women's clothing" || a.category==="men's clothing") {
         a.category="fashion";
        }
        Object.assign(a,{quanyity:1,total:a.price})
      });
    });
    this.cartservice.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
addToCart(item:any){
this.cartservice.addtoCart(item);
}
filter(category:string){
this.filterCaregory= this.productlist.filter((a:any)=>{
  if (a.category ==category || category=='') {
    return a;
  }
})
}
}
