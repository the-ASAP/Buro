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

  async filterListPage() {
    // window.location.href = `http://buro.asap-lp.ru/obektyi-spisok?parents=${this.parent}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&squareFrom=${this.squareFrom}&squareTo=${this.squareTo}&sortby=${this.dir}&sortdir=${this.sort}&address=${this.address}&flatRooms=${this.flatRooms}&flatBuildingType=${this.flatBuildingType}`;
    await fetch(
      `http://buro.asap-lp.ru/obektyi-spisok?parents=${this.parent}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&squareFrom=${this.squareFrom}&squareTo=${this.squareTo}&sortby=${this.dir}&sortdir=${this.sort}&address=${this.address}&flatRooms=${this.flatRooms}&flatBuildingType=${this.flatBuildingType}`
    ).then((res) => console.log(res));
  }

  filterCartPage() {
    window.location.href = `http://buro.asap-lp.ru/obektyi-karta?parents=${this.parent}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&squareFrom=${this.squareFrom}&squareTo=${this.squareTo}&sortby=${this.dir}&sortdir=${this.sort}&address=${this.address}&flatRooms=${this.flatRooms}&flatBuildingType=${this.flatBuildingType}`;
  }
}
