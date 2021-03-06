import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

import {IMyDpOptions} from 'mydatepicker';

/**
 * Generated class for the SummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
  providers: [UserDataProvider]
})
export class SummaryPage {

  private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };


  private model: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };

	private userSummary: any[];
  private userSummary2: any[];
  private myInput : any;
  private length : number =1;
  private numberOfWeeks : any;
  private myDate : any;
  private flag : number;
  private flag2 : any;
  private flag3 : number;
  private date : any;

  constructor(  public navCtrl: NavController, 
        				public navParams: NavParams,
        				private userData : UserDataProvider){

      console.log(this.myDate);
      this.flag = 0;
      console.log(this.model.date.month);
      this.getUserDate();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    
  }

  getData(date){
  	this.userData.getUserData(69,date).subscribe( (response) => {
        
        this.userSummary = response;
        this.userSummary2 = response;

        console.log(this.userSummary, 'response');
        console.log(this.userSummary[0].monthTotal);
        this.numberOfWeeks = this.userSummary[0].data;
        this.flag2 = Array<number>(this.userSummary[0].data.length);
        for(var i = 0; i < this.flag2.length; i++)
        {
          this.flag2[i] = 0;
        }
        this.flag3 = 0;




  });
}

  previousMonth(){
    if(this.date.month == 1)
    {
      this.date.month =12;
      this.date.year =  parseInt(this.date.year) - 1;
      // this.model.date.month = 12;
      // this.model.date.year = parseInt(this.date.end_date);
    }
    else{
      this.date.month = parseInt(this.date.month) - 1;
      // this.model.date.month = parseInt(this.date.start_date);
    }

    this.getData(this.date);
    console.log(this.model);

  }


  nextMonth(){
 
  if(this.date.month == 12)
    {
      this.date.month =1;
      this.date.year =  parseInt(this.date.year) + 1;
      // this.model.date.month = 1;
      // this.model.date.year = parseInt(this.date.end_date);
    }
    else{
      this.date.month =  parseInt(this.date.month) + 1;
      // this.model.date.month = parseInt(this.date.start_date);
    }
    this.getData(this.date);
    console.log(this.model);

  }



  filterByName(){

   this.flag = this.flag + 1;
   this.flag3 = 0;
   if(this.flag%2){
   this.userSummary = this.userSummary.sort((obj1,obj2) => {

    if(obj1.name > obj2.name)
      return -1;
    if(obj1.name < obj2.name)
      return 1;
   });
}
else{
this.userSummary = this.userSummary.sort((obj1,obj2) => {

    if(obj1.name > obj2.name)
      return 1;
    if(obj1.name < obj2.name)
      return -1;
});

}
   // this.userSummary = this.userSummary.reverse();
   console.log(this.userSummary);
   console.log(this.myDate);
   console.log(typeof(this.myDate));
   for(var i= 0; i<this.flag2.length; i++)
   {
    this.flag2[i] = 0;
   }
}



  filterByTime(row){
    this.flag = 1;
    this.flag3 = 0;
    console.log(this.flag2);
    for(var i = 0; i < this.userSummary[0].data.length; i++){

      if(row.week == this.userSummary[0].data[i].week)
      {

          for(var j= 0; j<this.flag2.length; j++)
             {
              if(i!=j)
              this.flag2[j] = 0;
             }

        this.flag2[i] +=1;
        // let j = this.userSummary[0].data.indexOf(i.week);
        console.log(i);
        if(this.flag2[i]%2)
        {
        this.userSummary = this.userSummary.sort((obj1,obj2) => {
      // console.log(obj1.data[0].weekTotal, obj2.data[0].weekTotal);
        if(obj1.data[i].weekTotal >= obj2.data[i].weekTotal)
          return -1;
        if(obj1.data[i].weekTotal < obj2.data[i].weekTotal)
         return 1;
        
   });
        }
      else{
        this.userSummary = this.userSummary.sort((obj1,obj2) => {
      // console.log(obj1.data[0].weekTotal, obj2.data[0].weekTotal);
        if(obj1.data[i].weekTotal >= obj2.data[i].weekTotal)
          return 1;
        if(obj1.data[i].weekTotal < obj2.data[i].weekTotal)
         return -1;
         });
      }

    }

  }

}



 filterByTime2(){

        this.flag=1;
        this.flag3 +=1;
        if(this.flag3%2)
        {
            this.userSummary = this.userSummary.sort((obj1,obj2) => {
      // console.log(obj1.data[0].weekTotal, obj2.data[0].weekTotal);
              if(obj1.monthTotal >= obj2.monthTotal)
                return -1;
              if(obj1.monthTotal < obj2.monthTotal)
                 return 1;
        
           });
        }
        else{
          this.userSummary = this.userSummary.sort((obj1,obj2) => {
      // console.log(obj1.data[0].weekTotal, obj2.data[0].weekTotal);
              if(obj1.monthTotal >= obj2.monthTotal)
                return 1;
              if(obj1.monthTotal < obj2.monthTotal)
               return -1;
        
           });

        }

        for(var i= 0; i<this.flag2.length; i++)
   {
    this.flag2[i] = 0;
   }


 }



  requestData(ev){

    console.log(ev);

    //  let inputDate = ev.formatted.split('.');
    // console.log(inputDate);
    if(ev.date.year != 0 && ev.date.month != 0){
    this.date = {
            year : ev.date.year,
            // start_date : curr.getMonth()+1
            month : ev.date.month
          };
          console.log(this.date);
          
          this.getData(this.date);
          }

  }



    getUserDate() {
          let curr = new Date();

          this.date = {
            year : curr.getFullYear(),
            month : curr.getMonth()+1
            // start_date : "6"
          };
          console.log(this.date);
          this.getData(this.date);
          this.myDate = "06/2017"
         
    }


    public callFilter()
  {
    // this.items = this.items1;

    console.log(this.userSummary);
    console.log(this.userSummary2);

    console.log("inside filter function");

     console.log(this.myInput);

      //if the value is an empty string don't filter the items
      if (this.myInput && this.myInput.trim() != '') {
      this.userSummary = this.userSummary2.filter((i) => {
         return (i.name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1);
       });


      console.log(this.userSummary);

      if(Object.keys(this.userSummary).length ==0){


        // this.loadError = true;
        console.log('No results to display');
        this.length = 0;
      }
      else{
        this.length = 1;
      }


    }


    else{
      this.userSummary = this.userSummary2;
      this.length =1;

    }
    // this.zone.run(() => {});

  }




}
