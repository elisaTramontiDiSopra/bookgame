import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GameData {

  /* LANGUAGE */
  game_it = 'assets/json/gameData.json';
  inventory_it = 'assets/json/inventory.json';
  game_fur = 'assets/json/gameData_fur.json';
  inventory_fur = 'assets/json/inventory_fur.json';
  game_en = 'assets/json/gameData_en.json';
  inventory_en = 'assets/json/inventory_en.json';
  gameJson: any;
  inventoryJson: any;

  creditsButton: any;
  rulesButton: any;
  settingsButton: any;

  text: string;
  beforeTextGood: string;
  beforeTextBad: string;
  afterTextGood: string;
  afterTextBad: string;
  choice1: string;
  goTo1: number;
  choice2: string;
  goTo2: number;
  choice3: string;
  goTo3: number;
  fight: any;
  itemAcquired: any;
  skillAcquired: any;
  chapter: number;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello GameData Provider');
    this.gameJson = this.game_it;
    this.inventoryJson = this.inventory_it;
  }

  getHome() {
    this.storage.get("language").then((data) => {
      switch (data) {
        case 'it':
          this.gameJson = this.game_it;
          this.inventoryJson = this.inventory_it;
          this.getHomeButtons();
          break;
        case 'en':
          this.gameJson = this.game_en;
          this.inventoryJson = this.inventory_en;
          this.getHomeButtons();
          break;
        case 'fur':
          this.gameJson = this.game_fur;
          this.inventoryJson = this.inventory_fur;
          this.getHomeButtons();
          break;
      }
    });
  }

  getHomeButtons(){
    this.http.get(this.gameJson).map(res => res.json().home).subscribe((data) => {
      this.creditsButton = data["credits"];
      this.rulesButton = data["rules"];
      this.settingsButton = data["settings"];
    });
  }

  lifeLabel: any;
  attackLabel: any;
  moneyLabel: any;
  reputationLabel: any;
  pointsLabel: any;
  fightTextLabel: any;
  fightMsg1: any;
  fightMsg2: any;
  fightMsg3: any;
  fightMsg4: any;

  getLabelsName(){
    this.http.get(this.gameJson).map(res => res.json()).subscribe((data) => {
      this.lifeLabel = data["labels"]["life"];
      this.attackLabel = data["labels"]["attack"];
      this.moneyLabel = data["labels"]["money"];
      this.reputationLabel = data["labels"]["reputation"];
      this.pointsLabel = data ["labels"]["points"];
      this.fightTextLabel = data ["labels"]["fightText"];
      this.fightMsg1 = data ["labels"]["fightMsg1"];
      this.fightMsg2 = data ["labels"]["fightMsg2"];
      this.fightMsg3 = data ["labels"]["fightMsg3"];
      this.fightMsg4 = data ["labels"]["fightMsg4"];
    });
  }

  getJsonData(chapter: number){
     this.http.get(this.gameJson).map(res => res.json()).subscribe((data) => {
     this.beforeTextGood = data["story"][chapter]["beforeTextGood"];
     this.beforeTextBad = data["story"][chapter]["beforeTextBad"];
     this.text = data["story"][chapter]["text"];
     this.afterTextGood = data["story"][chapter]["afterTextGood"];
     this.afterTextBad = data["story"][chapter]["afterTextBad"];
     this.choice1 = data["story"][chapter]["choice1"];
     this.goTo1 = data["story"][chapter]["goTo1"];
     this.choice2 = data["story"][chapter]["choice2"];
     this.goTo2 = data["story"][chapter]["goTo2"];
     this.choice3 = data["story"][chapter]["choice3"];
     this.goTo3 = data["story"][chapter]["goTo3"];
     this.fight = data["story"][chapter]["fight"];
     this.itemAcquired = data["story"][chapter]["itemAcquired"];
     this.skillAcquired = data["story"][chapter]["skillAcquired"];
     this.chapter = data["story"][chapter]["chapter"];
     return data;
    });
  }

  
  
  lifeValue : any; 
  attackValue: any;
  moneyValue: any;
  reputationValue: any;

  getInitialStats(){
    console.log("initial stats retrieved");
    Promise.all ([
      this.storage.get('life'),
      this.storage.get('attack'),
      this.storage.get('money'),
      this.storage.get('reputation'),
    ]).then(value => {
      this.lifeValue = value[0],
      this.attackValue = value[1],
      this.moneyValue = value[2],
      this.reputationValue = value[3]
    })
  }

  updateStat(stat, value){
    switch (stat) {
      case 'life':
        this.updateLife(value);
        break;
      case 'attack':
        this.updateAttack(value);
        break;
      case 'money':
        //this.updateMoney(value);
        break; 
      case 'reputation':
        console.log("stat = reputation");
        console.log ("value to add "+value);
        this.updateReputation(value);
        break; 
      }
  }

   updateMoney(operation, value) {
     this.storage.get('money').then((data) => {
       if (operation == "+") {
         this.moneyValue = +data + +value;
         // console.log(this.moneyValue);
         this.storage.set("money", this.moneyValue);
       }
       if (operation == "-") {
         this.moneyValue = +data - +value;
         this.storage.set("money", this.moneyValue);
       }
     })
   }

   updateReputation(value) {
     this.storage.get('reputation').then((data) => {  
        //console.log("reputation value" +value)       ;
        this.reputationValue = +data + +value;
        //console.log("new reputation value in game data "+this.reputationValue);
        this.storage.set("reputation", this.reputationValue);
       });
   }
   updateLife(value) {
     this.storage.get('life').then((data) => {         
        this.lifeValue = +data + +value;
        this.storage.set("life", this.lifeValue);
       });
   }
   updateAttack(value) {
     this.storage.get('attack').then((data) => {         
        this.attackValue = +data + +value;
        this.storage.set("attack", this.attackValue);
       });
   }



name: string;
description: string;
data: any;

getInventoryData(){
     this.http.get(this.inventoryJson).map(res => res.json()).subscribe((data) => {
     console.log(data);
     //console.log ("inventory"+this.inventory);
     return data;
    });
  }

  nameItem: any;
  descriptionItem: any;
  jpgItem: any;
  buttonOn: any;
  buttonOff: any;


  getItemInventory(item: any){
    //console.log('started getItemInventory function');  
    this.http.get(this.inventoryJson).map(res => res.json()[item]).subscribe((data) => {
       data.toPromise();
       console.log(data);
      //console.log("item"+item);
       this.nameItem = data["name"];
       console.log('getItem name'+this.nameItem);
       /*
      this.jpgItem = data[item]["jpg"];
      this.nameItem = data[item]["name"];
      this.descriptionItem = data[item]["description"];
      this.buttonOn = data[item]["buttonOn"];
      console.log('name '+this.nameItem);*/
    });
  }

  hide: any;
  swim: any;
  track: any;
  talk: any;

  getSkillsStats(){
    this.storage.get('hide').then((data) => {
      this.hide = data;
    });
    this.storage.get('swim').then((data) => {
      this.swim = data;
    });
    this.storage.get('talk').then((data) => {
      this.talk = data;
    });
    this.storage.get('track').then((data) => {
      this.track = data;
    });
  }

}