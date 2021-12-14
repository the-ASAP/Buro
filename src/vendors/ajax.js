export class filterObjects {
  constructor() {
    this.parent = '';
    this.priceFrom = '';
    this.priceTo = '';
    this.squareFrom = '';
    this.squareTo = '';
    this.dir = '';
    this.sort = '';
    this.address = '';
    this.flatRooms = '';
    this.flatBuildingType = '';
  }

  setAttr(prop, str) {
    this[prop] = str;
    return this;
  }

  getAttrs() {
    return this;
  }

  resetAttrs() {
    this.parent = '';
    this.priceFrom = '';
    this.priceTo = '';
    this.squareFrom = '';
    this.squareTo = '';
    this.dir = '';
    this.sort = '';
    this.address = '';
    this.flatRooms = '';
    this.flatBuildingType = '';

    return this;
  }

  filterListPage() {
    window.location.href = `http://buro.asap-lp.ru/obektyi-spisok?parents=${this.parent}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&squareFrom=${this.squareFrom}&squareTo=${this.squareTo}&sortby=${this.dir}&sortdir=${this.sort}&address=${this.address}&flatRooms=${this.flatRooms}&flatBuildingType=${this.flatBuildingType}`;
  }

  filterCartPage() {
    window.location.href = `http://buro.asap-lp.ru/obektyi-karta?parents=${this.parent}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&squareFrom=${this.squareFrom}&squareTo=${this.squareTo}&sortby=${this.dir}&sortdir=${this.sort}&address=${this.address}&flatRooms=${this.flatRooms}&flatBuildingType=${this.flatBuildingType}`;
  }
}
