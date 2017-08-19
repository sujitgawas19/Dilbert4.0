import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

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

	private userSummary: any[];

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private userData : UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    this.getUserDate();
  }

  getData(date){
  	this.userData.getUserData(69,date).subscribe( (response) => {
        
        this.userSummary = response;
        console.log(this.userSummary, 'response');



  });
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


          let dates = this.getStartAndEndOfDate(new Date());
          let date = {
            start_date: this.formatDate(dates.start),
            end_date: this.formatDate(dates.end)
          };
          console.log(date);
          this.getData(date);
         
    };




}
