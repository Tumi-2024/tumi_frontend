const TYPE_SALE_ENG = {
  전체: false,
  매매: 'sale',
  전세: 'charter',
  월세: 'rent',
  반전세: 'half-charter'
}

const TYPE_HOUSE_ENG = {
  아파트: 'apartment',
  재개발: 'redevelop',
  가로주택: 'house',
  기타매물: 'etc'
}

const TYPE_HOUSE_DETAIL_ENG = {
  전체: false,
  상가: 'store',
  '멸실 입주권': 'lost-resident-rights',
  연립다세대: 'serial-multi-family',
  단독다가구: 'single-multi-family',
  토지: 'land',
  뚜껑매물: 'lid-sale',
  '1+1매물': 'plus-sale'
}

// const TYPE_SALE_KR = {
//   sale: '매매',
//   charter: '전세',
//   rent: '월세',
//   'half-charter': '반전세'
// }

// const TYPE_HOUSE_KR = {
//   apartment: '아파트',
//   redevelop: '재개발',
//   house: '가로주택',
//   etc: '기타매물'
// }

// const TYPE_HOUSE_DETAIL_KR = {
//   store: '상가',
//   'lost-resident-rights': '멸실 입주권',
//   'serial-multi-family': '연립다세대',
//   'single-multi-family': '단독다가구',
//   land: '토지',
//   'lid-sale': '뚜껑매물',
//   'plus-sale': '1+1매물'
// }

const KR_DICTIONARY = {
  sale: '매매',
  charter: '전세',
  rent: '월세',
  'half-charter': '반전세',
  apartment: '아파트',
  redevelop: '재개발',
  house: '가로주택',
  etc: '기타매물',
  store: '상가',
  'lost-resident-rights': '멸실 입주권',
  'serial-multi-family': '연립다세대',
  'single-multi-family': '단독다가구',
  land: '토지',
  'lid-sale': '뚜껑매물',
  'plus-sale': '1+1매물',
  south: '남',
  west: '서',
  'south-west': '남서',
  east: '동',
  'south-east': '남동',
  north: '북',
  'north-west': '북서',
  'north-east': '북동'
}

export const toKr = (val) => {
  return KR_DICTIONARY[val];
}

export const toQueryString = params => {
  const condition = [];

  if (params.latitude) {
    if (params.latitude[0]) {
      condition.push(`latitude__range=${params.latitude[0]},${params.latitude[1]}`);
    } else {
      condition.push(`latitude=${params.latitude}`);
    }
  }

  if (params.longitude) {
    if (params.longitude[0]) {
      condition.push(`longitude__range=${params.longitude[0]},${params.longitude[1]}`);
    } else {
      condition.push(`longitude=${params.longitude}`);
    }
  }

  if (TYPE_SALE_ENG[params.typeSale]) {
    condition.push(`type_sale=${TYPE_SALE_ENG[params.typeSale]}`);
  }

  if (TYPE_HOUSE_ENG[params.typeHouse]) {
    condition.push(`type_house=${TYPE_HOUSE_ENG[params.typeHouse]}`);
    if (TYPE_HOUSE_ENG[params.typeHouse] === 'redevelop' || TYPE_HOUSE_ENG[params.typeHouse] === 'house') {
      if (TYPE_HOUSE_DETAIL_ENG[params.typeHouseDetail]) {
        condition.push(`type_house_detail=${TYPE_HOUSE_DETAIL_ENG[params.typeHouseDetail]}`);
      }
    }
  }

  if (params.salePrice) {
    if (!params.salePrice.min && !params.salePrice.max && params.salePrice.text === '전체') {

    } else if (!params.salePrice.min && !params.salePrice.max && params.salePrice.text !== '전체') {
      if (params.salePrice.text === '~1억') {
        condition.push(`price__lt=100000000`);
      } else if (params.salePrice.text === '1억') {
        condition.push(`price__range=100000000,200000000`);
      } else if (params.salePrice.text === '2억') {
        condition.push(`price__range=200000000,300000000`);
      } else if (params.salePrice.text === '3억') {
        condition.push(`price__range=300000000,400000000`);
      } else if (params.salePrice.text === '4억') {
        condition.push(`price__range=400000000,500000000`);
      } else if (params.salePrice.text === '5억') {
        condition.push(`price__range=500000000,600000000`);
      } else if (params.salePrice.text === '6억') {
        condition.push(`price__range=600000000,700000000`);
      } else if (params.salePrice.text === '7억') {
        condition.push(`price__range=700000000,800000000`);
      } else if (params.salePrice.text === '8억') {
        condition.push(`price__range=800000000,900000000`);
      } else if (params.salePrice.text === '9억') {
        condition.push(`price__range=900000000,1000000000`);
      } else if (params.salePrice.text === '10억') {
        condition.push(`price__range=1000000000,1100000000`);
      } else if (params.salePrice.text === '11억') {
        condition.push(`price__range=1100000000,1200000000`);
      } else if (params.salePrice.text === '12억') {
        condition.push(`price__range=1200000000,1300000000`);
      } else if (params.salePrice.text === '13억') {
        condition.push(`price__range=1300000000,1400000000`);
      } else if (params.salePrice.text === '14억') {
        condition.push(`price__range=1400000000,1500000000`);
      } else if (params.salePrice.text === '15억') {
        condition.push(`price__range=1500000000,1600000000`);
      } else if (params.salePrice.text === '16억~') {
        condition.push(`price__gt=1600000000`);
      }
    } else if (params.salePrice.min && params.salePrice.max) {
      condition.push(`price__range=${params.salePrice.min},${params.salePrice.max}`);
    } else if (params.salePrice.min && !params.salePrice.max) {
      condition.push(`price__gt=${params.salePrice.min}`);
    } else if (!params.salePrice.min && params.salePrice.max) {
      condition.push(`price__lt=${params.salePrice.max}`);
    }
  }

  if (params.depositPrice) {
    if (!params.depositPrice.min && !params.depositPrice.max && params.depositPrice.text === '전체') {

    } else if (!params.depositPrice.min && !params.depositPrice.max && params.depositPrice.text !== '전체') {
      if (params.depositPrice.text === '~1억') {
        condition.push(`price_deposit__lt=100000000`);
      } else if (params.depositPrice.text === '1억') {
        condition.push(`price_deposit__range=100000000,200000000`);
      } else if (params.depositPrice.text === '2억') {
        condition.push(`price_deposit__range=200000000,300000000`);
      } else if (params.depositPrice.text === '3억') {
        condition.push(`price_deposit__range=300000000,400000000`);
      } else if (params.depositPrice.text === '4억') {
        condition.push(`price_deposit__range=400000000,500000000`);
      } else if (params.depositPrice.text === '5억') {
        condition.push(`price_deposit__range=500000000,600000000`);
      } else if (params.depositPrice.text === '6억') {
        condition.push(`price_deposit__range=600000000,700000000`);
      } else if (params.depositPrice.text === '7억') {
        condition.push(`price_deposit__range=700000000,800000000`);
      } else if (params.depositPrice.text === '8억') {
        condition.push(`price_deposit__range=800000000,900000000`);
      } else if (params.depositPrice.text === '9억') {
        condition.push(`price_deposit__range=900000000,1000000000`);
      } else if (params.depositPrice.text === '10억') {
        condition.push(`price_deposit__range=1000000000,1100000000`);
      } else if (params.depositPrice.text === '11억') {
        condition.push(`price_deposit__range=1100000000,1200000000`);
      } else if (params.depositPrice.text === '12억') {
        condition.push(`price_deposit__range=1200000000,1300000000`);
      } else if (params.depositPrice.text === '13억') {
        condition.push(`price_deposit__range=1300000000,1400000000`);
      } else if (params.depositPrice.text === '14억') {
        condition.push(`price_deposit__range=1400000000,1500000000`);
      } else if (params.depositPrice.text === '15억') {
        condition.push(`price_deposit__range=1500000000,1600000000`);
      } else if (params.depositPrice.text === '16억~') {
        condition.push(`price_deposit__gt=1600000000`);
      }
    } else if (params.depositPrice.min && params.depositPrice.max) {
      condition.push(`price_deposit__range=${params.depositPrice.min},${params.depositPrice.max}`);
    } else if (params.depositPrice.min && !params.depositPrice.max) {
      condition.push(`price_deposit__gt=${params.depositPrice.min}`);
    } else if (!params.depositPrice.min && params.depositPrice.max) {
      condition.push(`price_deposit__lt=${params.depositPrice.max}`);
    }
  }

  return condition.join('&');
};

export const toMoneyString = (val) => {
  val = parseInt(val);
  const uk = Math.floor(val / 10000);
  const man = Math.floor((val - uk * 10000));
  const price = `${(uk > 0) ? `${uk}억 ` : ''}${(man > 0) ? ` ${man}만` : ''}`;
  return price;
}

const pad = (val) => {
  return val < 10 ? '0' + val : val
}

export const toDateFormat = (val) => {
  val = new Date(val)
  const year = val.getFullYear().toString().slice(-2)
  const month = pad(val.getMonth() + 1)
  const day = pad(val.getDate())
  return `${year}.${month}.${day}`
}
