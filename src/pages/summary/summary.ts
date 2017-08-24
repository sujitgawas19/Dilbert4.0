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


  private model: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };

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

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private userData : UserDataProvider) {
    console.log(this.myDate);
    this.flag = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    this.getUserDate();
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
    if(this.date.start_date == 1)
    {
      this.date.start_date =12;
      this.date.end_date =  parseInt(this.date.end_date) - 1;
    }
    else{
      this.date.start_date = parseInt(this.date.start_date) - 1;
    }
    this.getData(this.date);

  }

  nextMonth(){
 
  if(this.date.start_date == 12)
    {
      this.date.start_date =1;
      this.date.end_date =  parseInt(this.date.end_date) + 1;;
    }
    else{
      this.date.start_date =  parseInt(this.date.start_date) + 1;;
    }
    this.getData(this.date);

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

    this.date = {
            end_date : ev.date.year,
            // start_date : curr.getMonth()+1
            start_date : ev.date.month
          };
          console.log(this.date);
          if(this.date.start_date != 0 && this.date.end_date != 0){
          this.getData(this.date);
          }

  }



	formatDate(date) {
      let temp = new Date(date);
      return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
    }

    getDaysInMonth(month, year){
    	return new Date(year, month, 0).getDate();
    }


    getStartAndEndOfDate(date) {
      // if (isMonth) {
      //   let temp = new Date(date), y = temp.getFullYear(), m = temp.getMonth();
      //   let firstDay = new Date(y, m, 1);
      //   let lastDay = new Date(y, m + 1, 0);
      //   return {
      //     start : firstDay,
      //     end : lastDay
      //   };
      // }else {
        let curr = new Date();
        let first = 1; // First day is the day of the month
        let last = this.getDaysInMonth(curr.getMonth(), curr.getFullYear()); // last day is the first day + 6


        console.log(last);

        let firstDay = new Date(curr.setDate(first));
        let lastDay = new Date(curr.setDate(last));
        return {
          start : firstDay,
          end : lastDay
        };
    }
    getUserDate() {


          // let dates = this.getStartAndEndOfDate(new Date());
          // let date = {
          //   start_date: this.formatDate(dates.start),
          //   end_date: this.formatDate(dates.end)
          // };
          let curr = new Date();

          this.date = {
            end_date : curr.getFullYear(),
            // start_date : curr.getMonth()+1
            start_date : "6"
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
